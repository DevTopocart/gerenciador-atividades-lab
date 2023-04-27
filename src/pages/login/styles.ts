import styled from "styled-components";

import img from "../../assets/login-background.png";
import logoTopocart from "../../assets/logo_topocart.png";


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

export const LoginContainer = styled.div`
  width: 40%;
  height: 50%;
  background-color: white;
  border-radius: 4px;
  justify-content: center;
`;

export const ContainerTitle = styled.h1`
  display: flex;
  flex-direction: column;
  color: white;
  margin-bottom: 50px;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

interface InputProps {
  color?: string
}

export const Input = styled.input<InputProps>`
  margin-top: 10px;
  height: 35px;
  width: 80%;
  background-color: ${props => props.color || "whitesmoke"};
  border: 1px solid #ccc;
  border-radius: 3px;
  border-top: none;
  border-right: none;
  border-left: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputSubmit = styled.button`
  margin-top: 15px;
  width: 70%;
  background-color: #009C66;
  border-radius: 4px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: large;
  line-height: 27px;
  color: white;

  &:active {
    
    background-color: #009C66;
  }

  &:hover {

    background-color: #017d52;
  }
`;

export const Title = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 5px;
`

export const LogoTopocart = styled.img`
  align-self: flex-end;
  margin-top: 60px;
`

export const Version = styled.p`
  color: white;
  align-self: center;
  font-size: 8pt;
  margin: 0;
  margin-top: 5px;
`

export const Loader = styled.img`
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