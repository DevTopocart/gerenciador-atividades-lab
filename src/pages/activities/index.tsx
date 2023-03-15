import React from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import logoTopocart from './../../assets/logo_topocart.png'

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
} from "./styles"
import ActivitiesTaskComponent from "../../components/ActivitiesTasks/ActivitiesTaskComponent"
import IconButtonComponent from "../../components/IconButton/IconButtonComponent";

const ActivitiesPage: React.FC = () => {
	const history = useHistory();

	function onClick(){
		console.log('teste')
	}

	const redirect = () => {
		history.push("/minimize");
	};

	// async function getIssues() {
	// 	const result = api
	// 	.get('/issues.json')
	// 	.then((response) => response.data);
	// 	return result;
	// }

	// let issues = getIssues()
	// console.log(issues)

  return (
		<ContainerBackground>
			<ContainerTitle>
				<Title>
					Gerenciador de Atividades
				</Title>
				<User>
					Logado como: Victor Marotta
				</User>
			</ContainerTitle>

			<ActivitiesContainer>
				<ContainerSideLeft>
					<ContainerTask>
					  <ActivitiesTaskComponent clicked={true} hours={"75,3"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
					</ContainerTask>
				</ContainerSideLeft>

				<ContainerSideRight>
					<TitleInformation>
						Selecione uma atividade e utilize os controles abaixo para controlar a execução da atividade:
					</TitleInformation>
					<TimeSession>
						Tempo na Seção:
					</TimeSession>
					<Time>00:00:00</Time>

					<ContainerPlay>
						<IconButtonComponent icon={PlayIcon} onClick={redirect} background="green"/>
						<PlayPauseTitle> Iniciar Atividade </PlayPauseTitle>
					</ContainerPlay>

					<ContainerPause>
						<IconButtonComponent icon={PauseIcon} onClick={onClick} background="green"/>
						<PlayPauseTitle> Pausar Atividade</PlayPauseTitle>
					</ContainerPause>
					
				</ContainerSideRight>
			</ActivitiesContainer>
			<Footer>
				<LogoTopocart src={logoTopocart}/>
			</Footer>
		</ContainerBackground>
  );
}


export default ActivitiesPage;