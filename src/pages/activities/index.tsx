import React from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { invoke } from '@tauri-apps/api/tauri'

import {
    ContainerBackground,
		ActivitiesContainer,
		ContainerPlay,
		ContainerPause,
		Footer,
		LogoTopocart,
		ContainerTitle,
		ContainerSideLeft,
    ContainerSideRight,
		ContainerTask,
		TitleInformation,
		TimeSession,
		PlayPauseTitle,
		Time,
		PlayIcon,
		PauseIcon
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

	async function getIssues() {
		try {
			const response = await api.get('/issues.json');
			console.log(response.data)
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}	

	async function teste() {
		let issues = await getIssues()
		console.log(issues)
	}	



  return (
		<ContainerBackground>
			<ContainerTitle>
				<h2>Gerenciador de Atividades</h2>
				<h6>Logado como: Victor Marotta</h6>
			</ContainerTitle>

			<ActivitiesContainer>
				<ContainerSideLeft>
					<h3>Selecione uma atividade da lista abaixo:</h3>
					<ContainerTask>
					  <ActivitiesTaskComponent clicked={true} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent clicked={true} hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
					</ContainerTask>
				</ContainerSideLeft>

				<ContainerSideRight>
					<TitleInformation>
						Utilize os controles abaixo para controlar a execução da atividade:
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
						<IconButtonComponent icon={PauseIcon} onClick={teste} background="green"/>
						<PlayPauseTitle> Pausar Atividade</PlayPauseTitle>
					</ContainerPause>
					
				</ContainerSideRight>
			</ActivitiesContainer>
			<Footer>
				<LogoTopocart/>
			</Footer>
		</ContainerBackground>
  );
}


export default ActivitiesPage;