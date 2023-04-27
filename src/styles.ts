import styled from "styled-components";

import img from "./assets/login-background.png"

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
`