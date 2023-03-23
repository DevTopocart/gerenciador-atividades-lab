import styled from "styled-components";
import { RiPauseMiniFill } from "react-icons/ri";

export const ContainerActivitiesMinimized = styled.div`
  display: flex;
  flex-direction: column;
  width: 491px;
  height: 192px;
  background-color: #d9d9d9;
  border-radius: 4px;
`;

export const TitleActivitiesMinimized = styled.h2`
  display: flex;
  justify-content: start;
  margin-left: 12px;
  margin-bottom: 3px;
  margin-top: 10px;
`;

export const TitleActivitiesMinimizedConfirmed = styled.h3`
  display: flex;
  justify-content: center;
  margin-left: 12px;
  margin-bottom: 3px;
  margin-top: 10px;
`;

export const HoursTask = styled.h2`
  height: 10px;
  margin: 0;
`;

export const HoursTitle = styled.h4`
  margin: 0;
  margin-right: 6px;
  margin-left: 6px;
  border-radius: nullpx;
`;

export const ContainerHours = styled.div`
  display: flex;
  margin-top: 4px;
  margin-left: 4px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 10px;
`;

export const ContainerButtonsConfirmed = styled.div`
  position: absolute;
  margin: 0;
  margin-left: 300px;
  top: 148px;
`;

export const PauseIcon = styled(RiPauseMiniFill)`
  background-color: #009c66;
  color: white;
  font-size: 0.6em;
  margin: 0;
  border-radius: 50%;
`;

export const TitlePauseTask = styled.h4`
  display: flex;
  margin: 0;
  cursor: pointer;
  margin-left: 10px;
`;
