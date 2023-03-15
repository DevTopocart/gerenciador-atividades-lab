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
  margin: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
  margin-right: 23px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.div`
  display: flex;
  padding-left: 20px;
  justify-content: center;
`;

export const Input = styled.input`
  width: 80%;
  margin-bottom: 5%;
  border: 1px solid #ccc;
  border-radius: 3px;
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