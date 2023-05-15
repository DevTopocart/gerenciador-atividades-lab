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
import axios from "axios";

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

  const mock = {
    "time_entries": [
        {
            "id": 623,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.004,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-11",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-11T12:35:54Z",
            "updated_on": "2023-05-11T12:35:54Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 597,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.001,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T10:17:31Z",
            "updated_on": "2023-05-04T10:17:31Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 598,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.003,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T10:17:45Z",
            "updated_on": "2023-05-04T10:17:45Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 599,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.003,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T10:18:35Z",
            "updated_on": "2023-05-04T10:18:35Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 603,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T11:04:57Z",
            "updated_on": "2023-05-04T11:04:57Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 604,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.002,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T11:06:05Z",
            "updated_on": "2023-05-04T11:06:05Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 605,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.004,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T11:06:21Z",
            "updated_on": "2023-05-04T11:06:21Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 609,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.002,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:38:10Z",
            "updated_on": "2023-05-04T12:38:10Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 610,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.01,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:38:48Z",
            "updated_on": "2023-05-04T12:38:48Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 612,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.005,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:39:32Z",
            "updated_on": "2023-05-04T12:39:32Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 613,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.005,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:39:58Z",
            "updated_on": "2023-05-04T12:39:58Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 614,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.004,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:41:01Z",
            "updated_on": "2023-05-04T12:41:01Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 615,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:41:43Z",
            "updated_on": "2023-05-04T12:41:43Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 616,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:42:24Z",
            "updated_on": "2023-05-04T12:42:24Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 617,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.016,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T12:43:48Z",
            "updated_on": "2023-05-04T12:43:48Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 619,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.011,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-04",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-04T20:47:46Z",
            "updated_on": "2023-05-04T20:47:46Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 525,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.084,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T08:55:22Z",
            "updated_on": "2023-05-03T08:55:22Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 526,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T08:58:11Z",
            "updated_on": "2023-05-03T08:58:11Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 527,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.015,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T08:59:31Z",
            "updated_on": "2023-05-03T08:59:31Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 528,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.002,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T09:00:44Z",
            "updated_on": "2023-05-03T09:00:44Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 529,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.017,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T09:01:48Z",
            "updated_on": "2023-05-03T09:01:48Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 530,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T09:06:20Z",
            "updated_on": "2023-05-03T09:06:20Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 531,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.079,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T09:11:19Z",
            "updated_on": "2023-05-03T09:11:19Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 532,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T09:12:03Z",
            "updated_on": "2023-05-03T09:12:03Z",
            "easy_is_billable": false,
            "easy_billed": false
        },
        {
            "id": 533,
            "project": {
                "id": 176,
                "name": "Apontador de Horas"
            },
            "issue": {
                "id": 2127
            },
            "user": {
                "id": 105,
                "name": "Fellipe da Costa Silva"
            },
            "activity": {
                "id": 16,
                "name": "Work"
            },
            "hours": 0.009,
            "comments": "Atividade lançada pelo apontador de horas",
            "spent_on": "2023-05-03",
            "easy_external_id": null,
            "entity_id": 2127,
            "entity_type": "Issue",
            "created_on": "2023-05-03T09:13:17Z",
            "updated_on": "2023-05-03T09:13:17Z",
            "easy_is_billable": false,
            "easy_billed": false
        }
    ],
    "total_count": 106,
    "offset": 0,
    "limit": 25
}



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

  function somarHoras(json: any) {
    let totalHoras = 0;
  
    if ( json.time_entries && Array.isArray(json.time_entries)) {
      for (const entry of json.time_entries) {
      if (entry.hours && typeof entry.hours === 'number') {
          totalHoras += entry.hours;
      }
      }
    }
    return totalHoras;
  }

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
        const total = somarHoras(mock);
        console.log(total.toFixed(2)); 
        const responseTimeIssues = await api.get("/time_entries.json", {
          params: {
            set_filter: true,
            issue_id: issues[i].id,
            user_id: issues[i].assigned_to.id,
          },
        });
        console.log(responseTimeIssues)
        // issues[i].time = responseTimeIssues.data;

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
