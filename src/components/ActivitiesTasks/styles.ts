import styled from "styled-components";

interface ContainerTaskProps {
  isSelected?: boolean;
  disabled: boolean;
}

export const ContainerTask = styled.div<ContainerTaskProps>`
  margin: 1%;
  height: 100px;
  width: 98%;
  display: flex;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  line-height: 1.2;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#009C66" : "#fff")};
  color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#000000")};
  color: ${({ isSelected, disabled }) =>
    isSelected && !disabled ? "#ffffff" : "#000000"};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
`;

export const HoursTask = styled.div`
  display: flex;
  color: inherit;
  align-items: baseline;
  margin-bottom: 5px;

  p {
    margin: 0px;
  }

  .integer {
    font-size: 50px;
    letter-spacing: -7px;
    font-weight: 600;
  }

  .decimal {
    margin-left: 5px;
    font-size: 15px;
  }
`;

export const HoursTitle = styled.p`
  margin-top: 5px;
  font-weight: 300;
  opacity: 0.7;
  font-size: 10px;
  color: inherit;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 0px;
  color: inherit;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
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
  justify-content: space-between;
  max-width: 25%;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

export const ContainerSideRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const ExternalLinkContainer = styled.div`
  position: absolute;
  margin-top: 72px;
  margin-left: 290px;

  a {
    color: inherit;
  }
`;
