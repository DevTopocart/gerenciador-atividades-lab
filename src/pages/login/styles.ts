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
  height: 60%;
  background-color: white;
  border-radius: 4px;
  justify-content: center;
`;

export const SpanError = styled.span`
  color: red;
  font-size: 15px;
  padding: 0%;
`

export const ContainerTitle = styled.h1`
  display: flex;
  flex-direction: column;
  color: white;
  font-family: Poppins;
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
  text-align: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 80%;
  background-color: #D9D9D9;
  margin-bottom: 5%;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const InputSubmit = styled.button`
  width: 50%;
  background-color: #009C66;
  margin-bottom: 5%;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: white;
  font-family: Poppins;
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
  font-size: 6pt;
  margin: 0;
  margin-top: 5px;
`