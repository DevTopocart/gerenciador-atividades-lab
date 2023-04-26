import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../services/api";
import logoTopocart from "./../../assets/logo_topocart.png";
import packageJson from "./../../../package.json";

import {
  ContainerBackground,
  ActivitiesContainer,
  ContainerPlay,
  ContainerPause,
  Footer,
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
} from "./styles";
import ActivitiesTaskComponent from "../../components/ActivitiesTasks/ActivitiesTaskComponent";
import IconButtonComponent from "../../components/IconButton/IconButtonComponent";

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
  const [timeWhenLastStopped, setTimeWhenLastStopped] = useState<number>(0);
  const [issues, setIssues] = useState([]);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isActivitySelected, setIsActivitySelected] = useState(false);

  const handleTaskClick = (index: number, task: any) => {
    setSelectedTask(index);
    setIsActivitySelected(true);
    if (index !== selectedTask) {
      setStartTime(0);
      setTime(0);
    }
  };

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      setStartTime(0);
    }
  };

  const interval = useRef<ReturnType<typeof setInterval>>();

  const logout = () => {
    history.push(`/`);
  };

  async function getIssues() {
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
          const response2 = await api.get(`/issues/${id_parent.id}.json`);
          issue.name_parent = response2.data.issue.subject;
        } else {
          issue.name_parent = "----------------------";
        }
      }

      setIssues(issues);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIssues();
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

  return (
    <ContainerBackground>
      <ContainerTitle>
        <Title>Gerenciador de Atividades</Title>
        <User>Logado como: Victor Marotta</User>
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
                  hours={"XX,x"}
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
            Selecione uma atividade e utilize os controles abaixo para controlar
            a execução da atividade:
          </TitleInformation>
          <TimeSession>Tempo na Seção:</TimeSession>
          <Time>{formatMs(time)}</Time>

          <ContainerControls>
            <ContainerPlay>
              <IconButtonComponent
                icon={PlayIcon}
                onClick={start}
                disabled={!isActivitySelected}
                background="green"
              />
              <PlayPauseTitle> Iniciar Atividade </PlayPauseTitle>
            </ContainerPlay>

            <ContainerPause>
              <IconButtonComponent
                icon={PauseIcon}
                onClick={stop}
                disabled={!isActivitySelected}
                background="green"
              />
              <PlayPauseTitle> Pausar Atividade</PlayPauseTitle>
            </ContainerPause>
          </ContainerControls>
        </ContainerSideRight>
      </ActivitiesContainer>
      <Footer>
        <LogoTopocart src={logoTopocart} />
        <Version>Versão {packageJson.version}</Version>
      </Footer>
    </ContainerBackground>
  );
};

export default ActivitiesPage;
