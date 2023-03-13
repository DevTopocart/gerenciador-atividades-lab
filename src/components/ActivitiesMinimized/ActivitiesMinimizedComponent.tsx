import React from "react";
import ActivitiesTaskComponent from "../ActivitiesTasks/ActivitiesTaskComponent";
import DefaultButtonComponent from "../defaultButton/DefaultButtonComponent";
import IconButtonComponent from "../IconButton/IconButtonComponent";
import { ActivitiesMinimizedPropsType } from "./ActivitiesMinimizedPropsType";
import { useHistory } from "react-router-dom"
import { ContainerActivitiesMinimized, ContainerButtons, ContainerButtonsConfirmed, TitlePauseTask, TitleActivitiesMinimizedConfirmed, HoursTask,ContainerHours, HoursTitle, TitleActivitiesMinimized, PauseIcon } from "./styles";


const ActivitiesMinimizeComponent: React.FC<ActivitiesMinimizedPropsType> = (props) =>{
	const history = useHistory();

	function teste (): void {
		console.log('teste')
	}
	
	const redirectConfirmation = () => {
		history.push("/confirmation");
	};

	return(
			!props.isConfirmation ?(
		<ContainerActivitiesMinimized>
			<TitleActivitiesMinimized>{props.title}</TitleActivitiesMinimized>
			<ActivitiesTaskComponent clicked={false} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
			<ContainerHours>
				<HoursTitle>Tempo na seção:</HoursTitle>
				<HoursTask>00:42:12</HoursTask>

				<ContainerButtons>
					<IconButtonComponent icon={PauseIcon} onClick={redirectConfirmation} background={""}></IconButtonComponent>
					<TitlePauseTask> Pausar Atividade</TitlePauseTask>
				</ContainerButtons>
			</ContainerHours>

		</ContainerActivitiesMinimized>
			) : (
		<ContainerActivitiesMinimized>
			<TitleActivitiesMinimizedConfirmed>{props.title}</TitleActivitiesMinimizedConfirmed>
			<ActivitiesTaskComponent clicked={false} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
			<ContainerHours>
				<HoursTitle>Tempo na seção:</HoursTitle>
				<HoursTask>01:00:00</HoursTask>
				<ContainerButtonsConfirmed>
					<DefaultButtonComponent label={"Sim"} onClick={teste} background={""} ></DefaultButtonComponent>
					<DefaultButtonComponent label={"Não"} onClick={teste} background={"red"} ></DefaultButtonComponent>
				</ContainerButtonsConfirmed>
			</ContainerHours>
	
		</ContainerActivitiesMinimized>)
		);
}

export default ActivitiesMinimizeComponent;