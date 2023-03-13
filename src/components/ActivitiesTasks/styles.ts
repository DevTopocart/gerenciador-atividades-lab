import styled from "styled-components";

interface ContainerTaskProps {
  clicked: boolean;
}

export const ContainerTaskClicked = styled.div<ContainerTaskProps>`
  margin: 8px;
  height: 100px;
  width: 476px;
  display: flex;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  background-color: ${({ clicked }) => (clicked ? "#009C66" : "#fff")};
  color: ${({ clicked }) => (clicked ? "#000" : "#333")};
  cursor: pointer;
`;

export const ContainerTask = styled.div<ContainerTaskProps>`
  margin: 8px;
  height: 100px;
  width: 476px;
  display: flex;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  background-color: ${({ clicked }) => (clicked ? "#009C66" : "#fff")};
  color: ${({ clicked }) => (clicked ? "#000" : "#333")};
`;

export const ContainerSideLeft = styled.div`
  width: 25%;
  margin-left: 10px;
`;

export const HoursTask = styled.h2`
  height: 10px;
  margin: 10px;
  margin-top: 14px;
`;

export const HoursTitle = styled.h6`
  margin: 0;
  color: #707070;
  margin-top: 6px;
`;

export const Title = styled.h3`
  margin: 0;
  margin-top: 6px;
  margin-bottom: 5px;
  color: #000000; ;
`;

export const ContainerSideRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectDepartment = styled.h3`
  display: flex;
  justify-content: start;
  margin: 0;
  margin-top: 2px;
`;

export const ProjectTitle = styled.h3`
  display: flex;
  justify-content: start;
  margin: 0;
  color: #707070;
  margin-top: 6px;
`;
