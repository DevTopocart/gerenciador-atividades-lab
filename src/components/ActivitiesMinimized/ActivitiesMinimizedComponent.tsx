import ActivitiesTaskComponent from "../ActivitiesTasks/ActivitiesTaskComponent";
import DefaultButtonComponent from "../defaultButton/DefaultButtonComponent";
import {
  ContainerActivitiesMinimized,
  ContainerButtonsConfirmed,
  TitleActivitiesMinimizedConfirmed,
  HoursTask,
  ContainerHours,
  HoursTitle,
} from "./styles";

function ActivitiesMinimizeComponent(props: any) {
  function timePause(): void {
    props.pauseTime(true);
  }

  function timePlay(): void {
    props.playTime(false);
  }

  return (
    <ContainerActivitiesMinimized>
      <TitleActivitiesMinimizedConfirmed>
        Você ainda está nesta tarefa?
      </TitleActivitiesMinimizedConfirmed>
      <ActivitiesTaskComponent
        hours={"75,3h"}
        title={props.title}
        nameProject={props.nameProject}
        projectDepartment={props.projectDepartment}
      />

      <ContainerHours>
        <HoursTitle>Tempo na seção:</HoursTitle>
        <HoursTask>{props.time}</HoursTask>
        <ContainerButtonsConfirmed>
          <DefaultButtonComponent
            label={"Sim"}
            onClick={timePlay}
            background={""}
          ></DefaultButtonComponent>
          <DefaultButtonComponent
            label={"Não"}
            onClick={timePause}
            background={"red"}
          ></DefaultButtonComponent>
        </ContainerButtonsConfirmed>
      </ContainerHours>
    </ContainerActivitiesMinimized>
  );
}

export default ActivitiesMinimizeComponent;
