import Groups2Icon from "@mui/icons-material/Groups2";
import LogoutIcon from "@mui/icons-material/Logout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import TimerIcon from "@mui/icons-material/Timer";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FullPageLoader, Loader } from "../../components/FullPageLoader";
import { useLoading } from "../../hooks/useLoading";
import { Issues, User } from "../../interfaces";
import {
  createTimeEntryForGroup,
  createTimeEntryForUser,
  getGroup,
  getIssues,
  getIssuesFromGroupUser,
  getUser,
  updateStatusActivity,
} from "../../services/easy";
import { filterIssuesBySearchKey } from "../../utils/filterIssuesBySearchKey";
import { filterIssuesByStatus } from "../../utils/filterIssuesByStatus";
import { formatDate } from "../../utils/formatDate";
import { formatMs } from "../../utils/formatMs";
import { generateRandomTime } from "../../utils/generateRandomTime";
import loader from "./../../assets/loader.svg";
import background from "./../../assets/login-background.jpg";

export default function Atividades() {
  const location: any = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const { loading, setLoading } = useLoading();
  const [issues, setIssues] = useState<Issues[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issues>();
  const [supervisor, setSupervisor] = useState<User>();
  const [searchkey, setSearchkey] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const [timer, setTimer] = useState<{
    running: "stopped" | "running" | "paused" | "checking";
    startTime: Date | null;
    pausedTime: Date | null;
    elapsedTime: number;
    nextCheck: Date;
    expiredCheck: Date | null;
  }>({
    running: "stopped",
    startTime: null,
    pausedTime: null,
    elapsedTime: 0,
    nextCheck: new Date(),
    expiredCheck: null,
  });

  function handleTaskClick(index: number, issue: Issues) {
    if (timer.running === "stopped") {
      setSelectedIssue(issue);
    } else {
      toast.warn("Pare a atividade atual antes de selecionar outra");
    }
  }

  async function logTime(elapsedTime: number, startTime: Date, endTime: Date) {
    setLoading(true);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    const hours = elapsedTime / 3600000;

    if (location.state.user.type === "user") {
      try {
        await createTimeEntryForUser(
          location.state.user.id,
          selectedIssue!.project.id,
          selectedIssue!.id,
          formattedDate,
          hours.toFixed(3),
          startTime,
          endTime,
        );

        toast.success(
          `${
            Math.round(hours * 60 * 100) / 100
          } minutos registrados na atividade '${
            issues!.filter((e: any) => e.id === selectedIssue!.id)[0].subject
          }'`,
        );
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 422) {
          toast.warn("Nenhum tempo foi registrado no Easy Project");
        } else {
          toast.error("Não foi possível registrar o tempo no Easy Project");
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await createTimeEntryForGroup(
          location.state.user.id,
          selectedIssue!.project.id,
          selectedIssue!.id,
          formattedDate,
          hours.toFixed(3),
          startTime,
          endTime,
        );

        toast.success(
          `${
            Math.round(hours * 60 * 100) / 100
          } minutos registrados na atividade '${
            issues!.filter((e: any) => e.id === selectedIssue!.id)[0].subject
          }'`,
        );
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 422) {
          toast.warn("Nenhum tempo foi registrado no Easy Project");
        } else {
          toast.error("Não foi possível registrar o tempo no Easy Project");
        }
      } finally {
        setLoading(false);
      }
    }
  }

  async function fetchIssues(): Promise<Issues[] | undefined> {
    setLoading(true);

    try {
      let issues: Issues[] = [];

      const freshSupervisor = await fetchSupervisor();
      setSupervisor(freshSupervisor);

      if (location.state.user.type === "group") {
        issues = await getIssuesFromGroupUser(
          location.state.user.id,
          freshSupervisor?.id!,
        );
      } else {
        issues = await getIssues(location.state.user.id);
      }

      const uniqueIssues = Array.from(
        issues
          .reduce((map, item) => {
            return map.has(item.id) ? map : map.set(item.id, item);
          }, new Map())
          .values(),
      );
      const filteredIssues = uniqueIssues.filter(filterIssuesByStatus);

      setIssues(filteredIssues);
      if (!selectedIssue) setSelectedIssue(filteredIssues![0]);

      return filteredIssues;
    } catch (error: any) {
      if (error.response.status === 429)
        toast.error(
          "Muitas requisições ao Easy Project, por favor, notifique à TI Produção e tente novamente em alguns segundos",
          { autoClose: 60000 },
        );

      toast.error(
        "Não foi possível obter a lista de atividades do Easy Project",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSupervisor(): Promise<User | undefined> {
    try {
      setLoading(true);

      if (location.state.user.type === "user") {
        const user = await getUser(location.state.user.id);
        const user_supervisor = await getUser(user!.supervisor_user_id!);
        setSupervisor(user_supervisor);
        return user_supervisor!;
      } else {
        const group = await getGroup(location.state.user.id);
        const supervisor_id: number = group!.custom_fields?.find(
          (e) => e.id === 124,
        )?.value! as number;
        const group_supervisor = await getUser(supervisor_id);
        setSupervisor(group_supervisor);
        return group_supervisor!;
      }
    } catch (error) {
      toast.error("Não foi possível obter o gestor do usuário");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(selectedIssue);
  }, [selectedIssue]);

  useEffect(() => {
    fetchIssues();
  }, []);

  function startTimer() {
    updateActivityStatus();
    setTimer((current) => ({
      ...current,
      running: "running",
      startTime: current.running === "paused" ? current.startTime : new Date(),
      nextCheck: new Date(Date.now() + generateRandomTime()),
    }));
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    let now = new Date();

    if (timer.running === "running") {
      interval = setInterval(() => {
        setTimer((current) => ({
          ...current,
          elapsedTime: current.startTime?.getTime()
            ? now.getTime() - current.startTime.getTime()
            : 0,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  function updateActivityStatus() {
    if (selectedIssue!.status.id == 17) {
      updateStatusActivity(selectedIssue!.id, 3);
      selectedIssue!.status.id = 3;
      selectedIssue!.status.name = "In progress";
    }
  }

  function stopTimer(pausedTime?: Date) {
    let stopTime = pausedTime || new Date();
    logTime(
      stopTime.getTime() - timer.startTime!.getTime(),
      timer.startTime!,
      stopTime,
    );
    setTimer((current) => ({
      ...current,
      elapsedTime: 0,
      startTime: null,
      running: "stopped",
    }));
  }

  function pauseTimer() {
    let pausedTime = new Date();
    setTimer((current) => ({
      ...current,
      running: "paused",
      pausedTime: pausedTime,
    }));
  }

  const nextTimeoutCheckRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.running === "running") {
      const now = new Date();
      const targetDate = timer.nextCheck; // Set your exact date and time here

      const delay = targetDate.getTime() - now.getTime();
      console.log(
        `Timer rodando, próxima checagem às ${timer.nextCheck}, em ${delay} ms`,
      );

      if (delay > 0) {
        nextTimeoutCheckRef.current = setTimeout(() => {
          invoke("popup_window");
          setTimer((current) => ({
            ...current,
            running: "checking",
            expiredCheck: new Date(Date.now() + 300000),
          }));
          toast.warn(
            "Checando por presença, se não houver resposta as horas serão salvas automaticamente em 5 minutos",
            { autoClose: 300000 },
          );
          pauseTimer();
        }, delay);
      }
    }

    if (timer.running === "paused" && timer.expiredCheck) {
      const now = new Date();
      const targetDate = timer.expiredCheck; // Set your exact date and time here

      const delay = targetDate.getTime() - now.getTime();
      console.log(
        `Timer de expiração rodando, dados serão salvos às ${timer.nextCheck}, em ${delay} ms`,
      );

      if (delay > 0) {
        nextTimeoutCheckRef.current = setTimeout(() => {
          stopTimer(timer.pausedTime!);
          console.log("Salvando dados");
        }, delay);
      }
    }

    return () => {
      // Clean up
      if (nextTimeoutCheckRef.current) {
        clearTimeout(nextTimeoutCheckRef.current);
      }
    };
  }, [timer]);

  function handleGoToGestor() {
    history.push("/painel-gestor", location.state);
  }

  let now = new Date();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {location.state.user.type === "user" && (
            <>
              <IconButton color="success">
                <PersonIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="Acessar interface de gestão da equipe">
                <IconButton onClick={handleGoToGestor}>
                  <Groups2Icon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" gutterBottom>
            Logado como{" "}
            {location.state.user.type === "user"
              ? `${location.state.user.firstname} ${location.state.user.lastname} (Gestor: ${supervisor?.firstname} ${supervisor?.lastname})`
              : `${location.state.user.name} (Gestor: ${supervisor?.firstname} ${supervisor?.lastname})`}
          </Typography>
          &nbsp;
          <IconButton size="small" onClick={() => history.push("/")}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {loading && (
        <FullPageLoader>
          <Loader src={loader}></Loader>
        </FullPageLoader>
      )}

      <Card
        sx={{
          width: "90%",
          height: "85%",
          borderRadius: "5px",
        }}
      >
        <Box
          id="container-central"
          sx={{
            display: "flex",
            height: "100%",
          }}
        >
          <Box
            id="container-esquerda"
            sx={{
              width: "50%",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
            }}
          >
            <Box
              sx={{
                width: "100%",
                padding: "3%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextField
                label="Pesquisar atividade ou projeto"
                variant="standard"
                onChange={(e) => setSearchkey(e.target.value)}
                autoFocus
                fullWidth
              />
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconButton size="small" onClick={() => setOpenFilter(true)}>
                  <FilterAltIcon />
                </IconButton>
              </Box>
              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openFilter}
                onClose={() => setOpenFilter(false)}
              >
                The content of the Popover.
              </Popover> */}
            </Box>
            <Box
              sx={{
                overflowY: "auto",
                width: "98%",
              }}
            >
              {issues
                .filter(filterIssuesByStatus)
                .filter((issues) => filterIssuesBySearchKey(searchkey, issues))
                .map((task, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Card
                        sx={{
                          width: "98%",
                          padding: "1%",
                          marginTop: "2%",
                          backgroundColor:
                            selectedIssue?.id === task.id
                              ? "primary.main"
                              : "primary",
                          ":hover": {
                            backgroundColor: "primary.main",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => handleTaskClick(index, task)}
                      >
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                          >
                            #{task.id} - {task.status.name}
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            {task.subject}
                          </Typography>
                          {task.name_parent && (
                            <>
                              <Divider
                                sx={{
                                  marginTop: theme.spacing(1),
                                  marginBottom: theme.spacing(1),
                                }}
                              />
                              <Typography variant="body2" gutterBottom>
                                Subtarefa de {task.name_parent}
                              </Typography>
                            </>
                          )}
                          <Divider
                            sx={{
                              marginTop: theme.spacing(1),
                              marginBottom: theme.spacing(1),
                            }}
                          />
                          <Typography variant="body2">
                            Projeto {task.project.name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Tooltip title="Abrir tarefa no Easy Project">
                            <IconButton
                              size="small"
                              target="_blank"
                              href={`https://topocart.easyredmine.com/issues/${task.id}`}
                            >
                              <OpenInNewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Selecionar atividade para contabilizar tempo">
                            <IconButton
                              size="small"
                              onClick={() => handleTaskClick(index, task)}
                            >
                              <TimerIcon />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </Card>
                    </Box>
                  );
                })}
            </Box>
          </Box>
          <Box
            id="container-direita"
            sx={{
              display: "flex",
              width: "50%",
              height: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10%",
                marginBottom: "10%",
                maxHeight: "100%",
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom textAlign={"center"}>
                Tempo executado na sessão:
              </Typography>

              <Typography
                fontWeight={"bold"}
                variant="h3"
                gutterBottom
                textAlign={"center"}
              >
                {formatMs(
                  timer.startTime
                    ? now.getTime() - timer.startTime.getTime()
                    : 0,
                )}
              </Typography>

              <Divider
                sx={{
                  marginTop: "2%",
                }}
              />

              {selectedIssue ? (
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor:
                        timer.running === "checking"
                          ? "warning.main"
                          : "primary.main",
                      color:
                        timer.running === "checking"
                          ? "warning.contrastText"
                          : "primary.contrastText",
                    }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color={
                          timer.running === "checking"
                            ? "warning.contrastText"
                            : "primary.secondary"
                        }
                      >
                        #{selectedIssue.id}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {selectedIssue.subject}
                      </Typography>
                      {selectedIssue.name_parent && (
                        <>
                          <Divider
                            sx={{
                              marginTop: theme.spacing(1),
                              marginBottom: theme.spacing(1),
                            }}
                          />
                          <Typography variant="body2" gutterBottom>
                            Subtarefa de {selectedIssue.name_parent}
                          </Typography>
                        </>
                      )}
                      <Divider
                        sx={{
                          marginTop: theme.spacing(1),
                          marginBottom: theme.spacing(1),
                        }}
                      />
                      <Typography variant="body2">
                        Projeto {selectedIssue.project.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ) : (
                <>Selecione uma atividade na lista</>
              )}

              <Divider
                sx={{
                  marginTop: "2%",
                  marginBottom: "2%",
                }}
              />

              <Box
                id="buttons"
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  startIcon={<PlayCircleFilledWhiteIcon />}
                  color="success"
                  fullWidth
                  variant="contained"
                  disabled={!selectedIssue || timer.running === "running"}
                  onClick={startTimer}
                  sx={{
                    marginBottom: "2%",
                  }}
                >
                  Iniciar Atividade
                </Button>

                {timer.running !== "stopped" && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: "xx-small",
                      fontStyle: "italic",
                      paddingBottom: theme.spacing(1),
                    }}
                  >
                    Iniciada em {formatDate(timer.startTime!)}
                  </Typography>
                )}

                <Button
                  startIcon={<StopCircleIcon />}
                  color="success"
                  fullWidth
                  variant="contained"
                  disabled={!selectedIssue || timer.running === "stopped"}
                  onClick={() => stopTimer()}
                >
                  Parar Atividade
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
