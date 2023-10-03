import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
import { invoke } from '@tauri-apps/api';
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FullPageLoader, Loader } from '../../components/FullPageLoader';
import { Issues } from "../../interfaces";
import api from "../../services/api";
import loader from "./../../assets/loader.svg";
import background from "./../../assets/login-background.jpg";

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

export default function Atividades() {
  const location: any = useLocation();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [issues, setIssues] = useState<Issues[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issues>();

  const [timer, setTimer] = useState<{
    running: 'stopped' | 'running' | 'paused';
    elapsedTime: number;
    nextCheck: Date;
    expiredCheck: Date | null;
  }>({
    running: 'stopped',
    elapsedTime: 0,
    nextCheck: new Date(),
    expiredCheck: null
  });

  function handleTaskClick(index: number, issue: Issues) {
    setSelectedIssue(issue);
  }

  async function logTime() {
    setisLoading(true);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    const hours = timer.elapsedTime / 3600000;

    const time_json = {
      time_entry: {
        project_id: selectedIssue!.project.id,
        issue_id: selectedIssue!.id,
        user_id: selectedIssue!.assigned_to.id,
        hours: hours.toFixed(3),
        spent_on: formattedDate,
        comments: "Atividade lançada pelo apontador de horas",
      },
    };

    await api
      .post(`/time_entries.json`, time_json)
      .then((response) => {
        setisLoading(false);

        toast.success(
          `${
            Math.round(hours * 60 * 100) / 100
          } minutos registrados na atividade '${
            issues!.filter((e: any) => e.id === selectedIssue!.id)[0].subject
          }'`
        );
      })
      .catch((error: any) => {
        console.log(error);
        setisLoading(false);
        if (error.response.status === 422) {
          toast.warn("Nenhum tempo foi registrado no Easy Project");
        } else {
          toast.error("Não foi possível registrar o tempo no Easy Project");
        }
      });
    
      setTimer((current) => ({ ...current, elapsedTime: 0 }));
      setisLoading(false);
  }

  async function getIssues() {
    setisLoading(true);

    try {
      const response = await api.get("/issues.json", {
        params: {
          assigned_to_id: location.state.user.id,
        },
      });

      const issues: Issues[] = response.data.issues;

      for (let i = 0; i < issues.length; i++) {
        const responseTimeIssues = await api.get("/time_entries.json", {
          params: {
            set_filter: true,
            issue_id: issues[i].id,
            user_id: issues[i].assigned_to.id,
          },
        });
        const totalHours = addHours(responseTimeIssues.data);
        issues[i].time = totalHours;
        const id_parent = issues[i].parent;
        if (id_parent) {
          const responseIssues = await api.get(`/issues/${id_parent.id}.json`);
          issues[i].name_parent = responseIssues.data.issue.subject;
        } else {
          issues[i].name_parent = "-";
        }
      }

      setIssues(issues);
      setisLoading(false);
      return response.data;
    } catch (error) {
      setisLoading(false);
      toast.error(
        "Não foi possível obter a lista de atividades do Easy Project"
      );
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(selectedIssue);
  }, [selectedIssue]);

  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer.running === 'running') {
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
    setTimer((current) => ({ ...current, running: 'running', nextCheck: new Date(Date.now() + generateRandomTime()) }));
  }

  function stopTimer() {
    setTimer((current) => ({ ...current, running: 'stopped' }));
    logTime()
  }

  function pauseTimer() {
    setTimer((current) => ({ ...current, running: 'paused' }));
  }

  const nextTimeoutCheckRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.running === 'running') {

      const now = new Date();
      const targetDate = timer.nextCheck; // Set your exact date and time here
  
      const delay = targetDate.getTime() - now.getTime();
      console.log(`Timer rodando, próxima checagem às ${timer.nextCheck}, em ${delay} ms` )
  
      if (delay > 0) {
        nextTimeoutCheckRef.current = setTimeout(() => {
          setTimer((current) => ({...current, expiredCheck: new Date(Date.now() + 300000)}))
          toast.warn('Checando por presença, se não houver resposta as horas serão salvas automaticamente em 5 minutos', {autoClose: 300000});
          invoke('popup_window')
          pauseTimer()
          
        }, delay);
      }
    }

    if (timer.running === 'paused' && timer.expiredCheck) {
      
      const now = new Date();
      const targetDate = timer.expiredCheck; // Set your exact date and time here
  
      const delay = targetDate.getTime() - now.getTime();
      console.log(`Timer de expiração rodando, dados serão salvos às ${timer.nextCheck}, em ${delay} ms` )
  
      if (delay > 0) {
        nextTimeoutCheckRef.current = setTimeout(() => {
          stopTimer()
          console.log('Salvando dados');
          
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
          <Typography fontWeight={"bold"} variant="h6" gutterBottom>
            Gerenciador de Atividades
          </Typography>
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
            Logado como {location.state.user.firstname}{" "}{location.state.user.lastname}
          </Typography>
          &nbsp;
          <IconButton size='small' onClick={() => history.push('/')}>
            <LogoutIcon fontSize='small'/>
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
                      width: "98%",
                      padding: "1%",
                      marginTop: "2%",
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
                    disabled={!selectedIssue || timer.running === 'running'}
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
                    disabled={!selectedIssue || timer.running === 'stopped'}
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
