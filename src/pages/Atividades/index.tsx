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
  Tooltip,
  Typography,
} from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FullPageLoader, Loader } from "../../components/FullPageLoader";
import { Issues } from "../../interfaces";
import {
  createTimeEntryForGroup,
  createTimeEntryForUser,
  getCurrentActivityForGroup,
  getIssues,
} from "../../services/easy";
import loader from "./../../assets/loader.svg";
import background from "./../../assets/login-background.jpg";

export default function Atividades() {
  const location: any = useLocation();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [issues, setIssues] = useState<Issues[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issues>();

  const [timer, setTimer] = useState<{
    running: "stopped" | "running" | "paused";
    elapsedTime: number;
    nextCheck: Date;
    expiredCheck: Date | null;
  }>({
    running: "stopped",
    elapsedTime: 0,
    nextCheck: new Date(),
    expiredCheck: null,
  });

  function handleTaskClick(index: number, issue: Issues) {
    setSelectedIssue(issue);
  }

  async function logTime() {
    setisLoading(true);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    const hours = timer.elapsedTime / 3600000;

    if (location.state.user.type === "user") {
      try {
        await createTimeEntryForUser(
          location.state.user.id,
          selectedIssue!.project.id,
          selectedIssue!.id,
          formattedDate,
          hours.toFixed(3),
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
        setisLoading(false);
      }
    } else {
      try {
        await createTimeEntryForGroup(
          location.state.user.id,
          selectedIssue!.project.id,
          selectedIssue!.id,
          formattedDate,
          hours.toFixed(3),
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
        setisLoading(false);
      }
    }
  }

  async function fetchIssues() {
    setisLoading(true);

    try {
      const newIssues = await getIssues(location.state.user.id);

      setIssues(newIssues!);
      if (!selectedIssue) setSelectedIssue(newIssues![0]);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      toast.error(
        "Não foi possível obter a lista de atividades do Easy Project",
      );
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(selectedIssue);
  }, [selectedIssue]);

  useEffect(() => {
    fetchIssues();

    if (location.state.user.type === "group") {
      getCurrentActivityForGroup(location.state.user.id).then((response) => {
        if (response) {
          setIssues([response]);
          setSelectedIssue(response);
        }
      });
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.running === "running") {
      interval = setInterval(() => {
        setTimer((current) => ({
          ...current,
          elapsedTime: current.elapsedTime + 1000,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  function startTimer() {
    setTimer((current) => ({
      ...current,
      running: "running",
      nextCheck: new Date(Date.now() + generateRandomTime()),
    }));
  }

  function stopTimer() {
    setTimer((current) => ({ ...current, running: "stopped" }));
    logTime();
  }

  function pauseTimer() {
    setTimer((current) => ({ ...current, running: "paused" }));
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
          setTimer((current) => ({
            ...current,
            expiredCheck: new Date(Date.now() + 300000),
          }));
          toast.warn(
            "Checando por presença, se não houver resposta as horas serão salvas automaticamente em 5 minutos",
            { autoClose: 300000 },
          );
          invoke("popup_window");
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
          stopTimer();
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
    history.push("/gestor", location.state);
  }

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
              ? `${location.state.user.firstname} ${location.state.user.lastname}`
              : `${location.state.user.name} (usuário sem acesso ao Easy Project)`}
          </Typography>
          &nbsp;
          <IconButton size="small" onClick={() => history.push("/")}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {isLoading && (
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
              overflowY: "auto",
            }}
          >
            {issues.map((task, index) => {
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
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        #{task.id} - {task.status.name}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {task.subject}
                      </Typography>
                      <Typography variant="body2">
                        {task.project.name}
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
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10%",
                marginBottom: "10%",
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
                {formatMs(timer.elapsedTime)}
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
                      backgroundColor: "primary.main",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        #{selectedIssue.id}
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        {selectedIssue.subject}
                      </Typography>
                      <Typography variant="body2">
                        {selectedIssue.project.name}
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
                <Box id="box-button-start">
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

                  <Button
                    startIcon={<StopCircleIcon />}
                    color="success"
                    fullWidth
                    variant="contained"
                    disabled={!selectedIssue || timer.running === "stopped"}
                    onClick={stopTimer}
                  >
                    Parar Atividade
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function generateRandomTime() {
  const minTime = 30;
  const maxTime = 60;
  const randomTime =
    Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return randomTime * 60 * 1000;
}

function padStart(num: number) {
  return num.toString().padStart(2, "0");
}

function formatMs(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  minutes = minutes % 60;
  seconds = seconds % 60;

  const ms = Math.floor((milliseconds % 1000) / 10);

  let str = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;

  return str;
}

function addHours(json: any) {
  let totalHoras = 0;

  if (json.time_entries && Array.isArray(json.time_entries)) {
    for (const entry of json.time_entries) {
      if (entry.hours && typeof entry.hours === "number") {
        totalHoras += entry.hours;
      }
    }
  }
  return totalHoras.toFixed(2);
}
