import React from "react";

import { ActivitiesTaskPropsType } from "./ActivitiesTaskPropTypes";
import { ContainerTask, ContainerSideLeft,HoursTask, HoursTitle,Title, ContainerSideRight, ProjectDepartment,ProjectTitle }  from "./styles"

const ActivitiesTaskComponent: React.FC<ActivitiesTaskPropsType> = (props) => {
	return (
		<ContainerTask>
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
	);
}

export default ActivitiesTaskComponent;