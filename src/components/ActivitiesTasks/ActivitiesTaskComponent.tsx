import React, { useState } from "react";

import { ActivitiesTaskPropsType } from "./ActivitiesTaskPropTypes";
import { ContainerTaskClicked, ContainerTask, ContainerSideLeft,HoursTask, HoursTitle,Title, ContainerSideRight, ProjectDepartment,ProjectTitle }  from "./styles"

const ActivitiesTaskComponent: React.FC<ActivitiesTaskPropsType> = (props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }
  const handleClick2 = () => {
    console.log("2")
  }
  return (
    props.clicked ? (
		<ContainerTaskClicked clicked={clicked} onClick={handleClick}>
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
			
		</ContainerTaskClicked>
	) : (
  <ContainerTask clicked={clicked} onClick={handleClick2}>
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
    
  </ContainerTask>)
  )
}

export default ActivitiesTaskComponent;