import styled from "styled-components";

interface ContainerTaskProps {
  clicked: boolean;
}

export const ContainerTask = styled.div<ContainerTaskProps>`
  margin: 1%;
  height: 100px;
  width: 98%;
  display: flex;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  cursor: pointer;
  background-color: ${({ clicked }) => (clicked ? "#009C66" : "#fff")};
  color: ${({ clicked }) => (clicked ? "#ffffff" : "#000000")};
`;

export const HoursTask = styled.p`
  color: inherit;
  margin-top: 2px;
  font-size: 25pt;
  font-weight: 600;
`;

export const HoursTitle = styled.p`
  font-weight: 600;
  opacity: 0.7;
  font-size: small;
  color: inherit;
  margin-top: 2px;
`;

export const Title = styled.h5`
  margin: 0;
  font-size: large;
  margin-top: 5px;
  margin-bottom: 0px;
  color: inherit;
`;

export const ProjectDepartment = styled.p`
  display: flex;
  justify-content: start;
  font-size: small;
  margin: 0;
  opacity: 0.7;
  color: inherit;
`;

export const ProjectTitle = styled.p`
  display: flex;
  justify-content: start;
  font-size: small;
  margin: 0;
  margin-bottom: 5px;
  opacity: 0.7;
  color: inherit;
`;

export const ContainerSideLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 45%;
  text-align: left;
  margin-left: 10px;
`;

export const ContainerSideRight = styled.div`
  display: flex;
  flex-direction: column;
`;
