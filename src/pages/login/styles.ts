import styled from "styled-components";

import img from "../../assets/login-background.png";
import logoTopocart from "../../assets/logo_topocart.png";

export const LoginContainer = styled.div`
  width: 400px;
  height: 320px;
  background-color: white;
  border-radius: 5px;
  justify-content: center;
`;

export const ContainerTitle = styled.h1`
  color: white;
`;

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

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  margin-right: 23px;
`;

export const Footer = styled.div`
  position: fixed;
  height: 50px;
  bottom: 0px;
  left: 0px;
  color: white;
  right: 0px;
  margin-bottom: 10px;
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
  padding-left: 30px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const LogoTopocart = styled.image`
  background-image: url(${logoTopocart});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  width: 75px;
  height: 30px;
  margin: 6px;
`;
