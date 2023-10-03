import styled from "styled-components";
import { RiPauseMiniFill } from "react-icons/ri";

export const ContainerActivitiesMinimized = styled.div`
  display: flex;
  flex-direction: column;
  width: 491px;
  height: 210px;
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
  margin-top: 10px;
  margin-left: 4px;
`;

export const HoursTitle = styled.h4`
  margin-right: 6px;
  margin-left: 6px;
  margin-top: 9px;
  border-radius: nullpx;
`;

export const ContainerHours = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 4px;
`;

export const ContainerButtonsConfirmed = styled.div`
  padding-bottom: 10px;
  margin-left: 60px;
  margin-bottom: 10px;
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
