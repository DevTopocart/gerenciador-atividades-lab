import React from "react";

import {
    ContainerBackground,
		ActivitiesContainer,
		Footer,
		LogoTopocart,
		ContainerTitle,
		ContainerSideLeft,
    ContainerSideRight,
		ContainerTask,
		TitleInformation,
		TimeSession
} from "./styles"
import ActivitiesTaskComponent from "../../components/ActivitiesTasks/ActivitiesTaskComponent"

const ActivitiesPage: React.FC = () => {

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
					  <ActivitiesTaskComponent hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
						<ActivitiesTaskComponent hours={"75,3h"} title={"Restituição de Delimitadores Físicos"} nameProject={"Produto - Projeto"} projectDepartment={"Restituição"}/>
					</ContainerTask>
				</ContainerSideLeft>

				<ContainerSideRight>
					<TitleInformation>
						Utilize os controles abaixo para controlar a execução da atividade:
					</TitleInformation>
					<TimeSession>
						Tempo na Seção:
					</TimeSession>
				</ContainerSideRight>
			</ActivitiesContainer>
			<Footer>
				<LogoTopocart/>
			</Footer>
		</ContainerBackground>
  );
}


export default ActivitiesPage;