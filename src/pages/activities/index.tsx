import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import api from "../../services/api";
import { invoke } from '@tauri-apps/api/tauri'
import logoTopocart from './../../assets/logo_topocart.png'
import packageJson from './../../../package.json'

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
		ContainerControls,
		Version,
} from "./styles"
import ActivitiesTaskComponent from "../../components/ActivitiesTasks/ActivitiesTaskComponent"
import IconButtonComponent from "../../components/IconButton/IconButtonComponent";
import { Button } from "../../components/defaultButton/styles";

const padStart = (num: number) => {
	return num.toString().padStart(2, "0")
}
  
const formatMs = (milliseconds: number) => {
	
	let seconds = Math.floor(milliseconds / 1000)
	let minutes = Math.floor(seconds / 60)
	let hours = Math.floor(minutes / 60)

	// using the modulus operator gets the remainder if the time roles over
	// we don't do this for hours because we want them to rollover
	// seconds = 81 -> minutes = 1, seconds = 21.
	// 60 minutes in an hour, 60 seconds in a minute, 1000 milliseconds in a second.
	minutes = minutes % 60
	seconds = seconds % 60
	// divide the milliseconds by 10 to get the tenths of a second. 543 -> 54
	const ms = Math.floor((milliseconds % 1000) / 10)

	let str = `${padStart(hours)}:${padStart(minutes)}:${padStart(seconds)}`


	return str
}

const ActivitiesPage: React.FC = () => {
	const location:any = useLocation();
	const history = useHistory();
	const [time, setTime] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const [startTime, setStartTime] = useState<number>(0)
	const [timeWhenLastStopped, setTimeWhenLastStopped] = useState<number>(0)
	const [issues,setIssues] = useState([])

	const start = () => {

		if (!isRunning) {

			setIsRunning(true)
			setStartTime(Date.now())
		}
	}

	const stop = () => {

		if (isRunning) {

			setIsRunning(false)
			setStartTime(0)
		}
	  }

	const interval = useRef<ReturnType<typeof setInterval>>()

	
	function onClick(){
		console.log('Clicked!')
	}

	const logout = () => {
		console.log(1)
		history.push(`/`);
	};

	async function getIssues() {
		try {

			const response = await api.get('/issues.json',{
				params: {
					assigned_to_id: 88
				}
			});
			
			setIssues(response.data.issues)
			return response.data;
		} catch (error) {
			
			console.error(error);
		}
	}		
	
	useEffect(() => {

		console.log(location.state.user)
		getIssues()

		if (startTime > 0) {
			interval.current = setInterval(() => {
			setTime(() => Date.now() - startTime)
			}, 1)
		} else {
			if (interval.current) {
			clearInterval(interval.current)
			interval.current = undefined
			}
		}
		}, [startTime])

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
						{issues.map((e: any) => {
							return <ActivitiesTaskComponent 
													clicked={true} 
													hours={"XX,x"} 
													title={e.subject} 
													nameProject={e.project.name} 
													projectDepartment={"XXXXXXX"}/>
						})}
					</ContainerTask>
				</ContainerSideLeft>

				<ContainerSideRight>
					<TitleInformation>
						Selecione uma atividade e utilize os controles abaixo para controlar a execução da atividade:
					</TitleInformation>
					<TimeSession>
						Tempo na Seção:
					</TimeSession>
					<Time>
						{formatMs(time)}
					</Time>

					<ContainerControls>
						<ContainerPlay>
							<IconButtonComponent icon={PlayIcon} onClick={start} background="green"/>
							<PlayPauseTitle> Iniciar Atividade </PlayPauseTitle>
						</ContainerPlay>

						<ContainerPause>
							<IconButtonComponent icon={PauseIcon} onClick={stop} background="green"/>
							<PlayPauseTitle> Pausar Atividade</PlayPauseTitle>
						</ContainerPause>
					</ContainerControls>
					
				</ContainerSideRight>
			</ActivitiesContainer>
			<Footer>
				<LogoTopocart src={logoTopocart}/>
				<Version>
					Versão {packageJson.version}
				</Version>
			</Footer>
		</ContainerBackground>
  );
}


export default ActivitiesPage;