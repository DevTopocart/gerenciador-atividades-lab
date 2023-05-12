import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../services/api";
import logoTopocart from "/logo_topocart.png";
import packageJson from "./../../../package.json";
import loader from "/loader.svg";
import {
  ContainerBackground,
  ActivitiesContainer,
  ContainerPlay,
  ContainerPause,
  Footer,
  ContainerLogout,
  LogoutIcon,
  ContainerTitle,
  ContainerSideLeft,
  ContainerSideRight,
  ContainerTask,
  TitleInformation,
  TimeSession,
  PlayPauseTitle,
  Time,
  PlayIcon,
  PauseIcon,
  User,
  LogoTopocart,
  Title,
  ContainerControls,
  Version,
  FullPageLoader,
  Loader,
  ContainerActivitiesMinimizedCentered,
  DisableBackground,
} from "./styles";
import ActivitiesTaskComponent from "../../components/ActivitiesTasks/ActivitiesTaskComponent";
import IconButtonComponent from "../../components/IconButton/IconButtonComponent";
import { toast } from "react-toastify";
import ActivitiesMinimizeComponent from "../../components/ActivitiesMinimized/ActivitiesMinimizedComponent";
import { invoke } from "@tauri-apps/api/tauri";

const padStart = (num: number) => {
  return num.toString().padStart(2, "0");
};

const formatMs = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  minutes = minutes % 60;
  seconds = seconds % 60;

  const ms = Math.floor((milliseconds % 1000) / 10);

  let str = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`;

  return str;
};

const ActivitiesPage: React.FC = () => {
  const location: any = useLocation();
  const history = useHistory();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [isLoading, setisLoading] = useState(false);
  const [issues, setIssues] = useState<Array<any>>([]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isActivitySelected, setIsActivitySelected] = useState(false);
  const [isPoupUp, setIsPoupUp] = useState(false);
  const [task, setTask] = useState<any>({});
  const [confirmedActivities, setConfirmedActivities] = useState(false);
  const [randomTimeMs, setRandomTimeMs] = useState(generateRandomTime());

  const handleTaskClick = (index: number, task: any) => {
    setSelectedTask(index);
    setIsActivitySelected(true);
    if (index !== selectedTask) {
      setStartTime(0);
      setTime(0);
    }
    setTask(task);
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
    }
  };

  function generateRandomTime() {
    const minTime = 30;
    const maxTime = 60;
    const randomTime =
      Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    return randomTime * 60 * 1000;
  }

  const stop = async () => {
    setisLoading(true);

    if (isRunning) {
      setIsRunning(false);
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-CA");
      const hours = time / 3600000;

      const time_json = {
        time_entry: {
          project_id: task.project.id,
          issue_id: task.id,
          user_id: task.assigned_to.id,
          hours: hours.toFixed(3),
          spent_on: formattedDate,
          comments: "Atividade lançada pelo apontador de horas",
        },
      };

      api
        .post(`/time_entries.json`, time_json)
        .then((response) => {
          setisLoading(false);

          console.log(response);
          toast.success(
            `${
              Math.round(hours * 60 * 100) / 100
            } minutos registrados na atividade '${
              issues!.filter((e: any) => e.id === task.id)[0].subject
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
      setStartTime(0);
      setTime(0);
      const newRandomTimeMs = generateRandomTime();
      setRandomTimeMs(newRandomTimeMs);
      setConfirmedActivities(false);
      setIsPoupUp(false);
    }
  };

  const interval = useRef<ReturnType<typeof setInterval>>();

  const logout = () => {
    history.push(`/`);
  };

  async function getIssues() {
    setisLoading(true);

    try {
      const response = await api.get("/issues.json", {
        params: {
          assigned_to_id: location.state.user.id,
        },
      });

      const issues = response.data.issues;

      for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];
        const id_parent = issue.parent;
        if (id_parent) {
          const responseIssues = await api.get(`/issues/${id_parent.id}.json`);
          issue.name_parent = responseIssues.data.issue.subject;
        } else {
          issue.name_parent = "-";
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
  const confirmedButtonActivities = () => {
    setIsPoupUp(false);
    setConfirmedActivities(true);
  };

  useEffect(() => {
    if (startTime > 0) {
      interval.current = setInterval(() => {
        setTime(() => Date.now() - startTime);
      }, 1);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = undefined;
      }
    }
  }, [startTime]);

  useEffect(() => {
    if (confirmedActivities) {
      const newRandomTimeMs = generateRandomTime();
      setRandomTimeMs(time + newRandomTimeMs);
    } else if (time >= randomTimeMs + 300000) {
      setIsPoupUp(false);
      stop();
    } else if (time >= randomTimeMs && !confirmedActivities) {
      setIsPoupUp(true);
    }
  }, [time, confirmedActivities, randomTimeMs]);

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      {isLoading && (
        <FullPageLoader>
          <Loader src={loader}></Loader>
        </FullPageLoader>
      )}

      <ContainerBackground>
        <ContainerLogout>
          <IconButtonComponent icon={LogoutIcon} onClick={logout} />
        </ContainerLogout>
        <ContainerTitle>
          <Title>Gerenciador de Atividades</Title>
          <User>
            Logado como: {location.state.user.firstname}{" "}
            {location.state.user.lastname}
          </User>
        </ContainerTitle>

        <ActivitiesContainer>
          <ContainerSideLeft>
            <ContainerTask>
              {issues.map((e: any, index: number) => {
                return (
                  <ActivitiesTaskComponent
                    key={index}
                    index={index}
                    isSelected={selectedTask === index}
                    // se esta selecionado o index correto
                    onSelect={() => handleTaskClick(index, e)}
                    // Lidar com a seleção do item para passar pro outro component
                    hours={12.433}
                    issueId={e.id}
                    title={e.subject}
                    nameProject={e.project.name}
                    projectDepartment={e.name_parent}
                    disabled={isRunning}
                  />
                );
              })}
            </ContainerTask>
          </ContainerSideLeft>

          <ContainerSideRight>
            <TitleInformation>
              Selecione uma atividade e utilize os controles abaixo para
              registrar o tempo gasto em sua execução:
            </TitleInformation>
            <TimeSession>Tempo na Seção:</TimeSession>
            <Time>{formatMs(time)}</Time>

            <ContainerControls>
              <ContainerPlay>
                <IconButtonComponent
                  icon={PlayIcon}
                  onClick={start}
                  disabled={!isActivitySelected || isRunning}
                  background="green"
                />
                <PlayPauseTitle> Iniciar Atividade </PlayPauseTitle>
              </ContainerPlay>

              <ContainerPause>
                <IconButtonComponent
                  icon={PauseIcon}
                  onClick={stop}
                  disabled={!isActivitySelected || !isRunning}
                  background="green"
                />
                <PlayPauseTitle> Parar Atividade</PlayPauseTitle>
              </ContainerPause>
            </ContainerControls>
          </ContainerSideRight>
        </ActivitiesContainer>

        <Footer>
          <LogoTopocart src={logoTopocart} />
          <Version>Versão {packageJson.version}</Version>
        </Footer>

        <DisableBackground disabled={isPoupUp} />
        {isPoupUp && (
          <ContainerActivitiesMinimizedCentered>
            <ActivitiesMinimizeComponent
              hours={"XX,x"}
              time={formatMs(time)}
              pauseTime={stop}
              playTime={confirmedButtonActivities}
              title={task.subject}
              nameProject={task.project.name}
              projectDepartment={task.name_parent}
            />
          </ContainerActivitiesMinimizedCentered>
        )}
      </ContainerBackground>
    </>
  );
};

export default ActivitiesPage;
