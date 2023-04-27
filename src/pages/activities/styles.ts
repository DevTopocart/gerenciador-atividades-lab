import styled from "styled-components";

import img from "../../assets/login-background.png";
import logoTopocart from "../../assets/logo_topocart.png";
import { RiPlayFill, RiStopMiniFill } from "react-icons/ri";
import { RiPauseMiniFill } from "react-icons/ri";

export const ContainerBackground = styled.div`
  background-image: url(${img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerTitle = styled.h1`
  display: flex;
  flex-direction: column;
  color: white;
  margin-bottom: 10px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ActivitiesContainer = styled.div`
  width: 80%;
  height: 70%;
  top: 20%;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

export const ContainerSideLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
`;

export const ContainerSideRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const ContainerTask = styled.div`
  margin-top: 1%;
  margin-bottom: 1%;
  width: 98%;
  flex-direction: column;
  height: 98%;
  border-radius: 5px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  justify-content: start;
  background-color: #d9d9d9;
  overflow-y: scroll;
`;

export const TitleInformation = styled.h4`
  display: flex;
  text-align: center;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const TimeSession = styled.h3`
  display: flex;
  justify-content: center;
  margin: 10px;
  text-align: center;
`;

export const Time = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10px;
  margin-bottom: 40px;
  text-align: center;
`;

export const PlayIcon = styled(RiPlayFill)`
  background-color: #009c66;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
`;

export const PauseIcon = styled(RiStopMiniFill)`
  background-color: #707070;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
`;

export const ContainerControls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`

export const ContainerPlay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
`;

export const PlayPauseTitle = styled.h3`
  display: flex;
  margin-left: 10px;
  text-align: center;
`;

export const ContainerPause = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const User = styled.p`
  font-size: small;
  font-weight: 500;
  margin-bottom: 5px;
  color: rgb(210,210,210,0.7);
`

export const Title = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 5px;
`

export const LogoTopocart = styled.img`
  margin-top: 15px;
`

export const Version = styled.p`
  color: white;
  align-self: center;
  font-size: 6pt;
  margin: 0;
  margin-top: 5px;
`

export const FullPageLoader = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.75);
  z-index: 10000;
  align-items: center;
  justify-content: center;
`

export const Loader = styled.img`
  height: 200px;
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`