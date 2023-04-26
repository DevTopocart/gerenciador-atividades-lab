import React, { useState } from "react";

import { ActivitiesTaskPropsType } from "./ActivitiesTaskPropTypes";
import { ContainerTask, ContainerSideLeft,HoursTask, HoursTitle,Title, ContainerSideRight, ProjectDepartment,ProjectTitle }  from "./styles"

const ActivitiesTaskComponent: React.FC<ActivitiesTaskPropsType> = (props) => {
  const handleClick = () => {
    props.onSelect(props.index);
    //  Passa o indice da tarefa que vai ser selecionada
  }
  return (
    <ContainerTask isSelected={props.isSelected} onClick={handleClick}>
      <ContainerSideLeft>
        <HoursTitle>
          Horas Executadas
        </HoursTitle>
        <HoursTask>
          {props.hours}
        </HoursTask>
      </ContainerSideLeft>

      <ContainerSideRight>
        <Title>{props.title}</Title>
        <ProjectDepartment>{props.projectDepartment}</ProjectDepartment>
        <ProjectTitle>{props.nameProject}</ProjectTitle>
      </ContainerSideRight>
      
    </ContainerTask>
  )
}

export default ActivitiesTaskComponent;