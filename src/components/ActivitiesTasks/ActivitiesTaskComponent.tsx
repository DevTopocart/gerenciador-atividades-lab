import React, { useState } from "react";
import { ContainerTask, ContainerSideLeft,HoursTask, HoursTitle,Title, ContainerSideRight, ProjectDepartment,ProjectTitle, ExternalLinkContainer }  from "./styles"

function ActivitiesTaskComponent(props: any){
  const handleClick = () => {
    if (!props.disabled) {
      props.onSelect(props.index);
    }
    //  Passa o indice da tarefa que vai ser selecionada
  }
  return (
    <ContainerTask isSelected={props.isSelected} onClick={handleClick}  disabled={props.disabled}>
      <ContainerSideLeft>
        <HoursTitle>
          Horas Executadas
        </HoursTitle>
        <HoursTask>
          <p className="integer">
            {Math.floor(props.hours)}
          </p>
          <p className="decimal">
            {`.${Math.floor((props.hours - Math.floor(props.hours))*100)}`}
          </p>
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