import styled, { css } from "styled-components";
import { ButtonProps } from "./IconButtonPropTypes";

export const Button = styled.a<ButtonProps>`
  display: flex;
  font-size: 1.4rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0;

  ${(props) =>
    props.disabledProp &&
    css`
      cursor: default;
      opacity: 0.5;
    `}
`;
