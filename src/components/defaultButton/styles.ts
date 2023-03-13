import styled from "styled-components";

export const defaultButtonContent = styled.div``;

export const disabledButtonStyle = {
  backgroundColor: "grey !important",
  opacity: 0.5,
  cursor: "not-allowed",
};

export const Button = styled.button`
  background-color: #009c66;
  ${(props) => props.disabled && disabledButtonStyle};
  background-color: ${(props) =>
    props.disabled ? disabledButtonStyle.backgroundColor : "#009c66"};
  color: white;
  border-radius: 5px;
  width: auto;
  height: auto;
  margin: 4px;
  font-size: 13px;
`;
