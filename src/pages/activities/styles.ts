import styled from "styled-components";

import img from "../../assets/login-background.png";
import logoTopocart from "../../assets/logo_topocart.png";
import { RiPlayFill } from "react-icons/ri";
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
  color: white;
  height: 130px;
`;

export const Footer = styled.div`
  position: fixed;
  height: 50px;
  bottom: 0px;
  left: 0px;
  color: white;
  right: 0px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

export const LogoTopocart = styled.image`
  background-image: url(${logoTopocart});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  width: 75px;
  height: 30px;
  margin: 6px;
`;

export const ActivitiesContainer = styled.div`
  width: 990px;
  height: 500px;
  left: 188px;
  top: 147px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

export const ContainerSideLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;
export const ContainerSideRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const ContainerTask = styled.div`
  width: 100%;
  flex-direction: column;
  height: 420px;
  margin-left: 20px;
  border-radius: 5px;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  justify-content: start;
  background-color: #d9d9d9;
  overflow: scroll;
`;

export const TitleInformation = styled.h3`
  display: flex;
  margin: 20px;
  margin-left: 40px;
  text-align: center;
`;

export const TimeSession = styled.h3`
  display: flex;
  justify-content: center;
  margin: 10px;
  margin-left: 40px;
  text-align: center;
`;

export const Time = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10px;
  margin-left: 40px;
  text-align: center;
`;

export const PlayIcon = styled(RiPlayFill)`
  background-color: #009c66;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
`;

export const PauseIcon = styled(RiPauseMiniFill)`
  background-color: #707070;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
`;

export const ContainerPlay = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 75px;
  align-items: flex-start;
  margin-top: 45px;
`;

export const PlayPauseTitle = styled.h1`
  display: flex;
  margin-top: 15px;
  margin-left: 10px;
  text-align: center;
`;

export const ContainerPause = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 75px;
  align-items: flex-start;
  margin-top: 15px;
`;
