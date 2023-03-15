import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import logoTopocart from './../../assets/logo_topocart.png'

import DefaultButtonComponent from "../../components/defaultButton/DefaultButtonComponent";

import {
  ContainerBackground,
  ButtonContainer,
  ContainerTitle,
  Input,
  Footer,
  LabelContainer,
  LoginContainer,
  LogoTopocart,
  FormContainer,
  Title
} from "./styles";
import { LoginFormType } from "./types/LoginFormType";

const LoginPage: React.FC<LoginFormType> = () => {
  const { register, handleSubmit } = useForm<LoginFormType>();
  const history = useHistory();
  
  const onSubmit = (data: LoginFormType) => {
    console.log(data);
  };

  const redirect = () => {
    history.push("/activities");
  };

  return (
    <ContainerBackground>
      <ContainerTitle>
				<Title>
					Gerenciador de Atividades
				</Title>
      </ContainerTitle>
      <LoginContainer>
        <LabelContainer>
          <h4>Acesse com seu usuário e senha dos sistemas Topocart</h4>
        </LabelContainer>
        <FormContainer>
        <form >
          <Input type="text" placeholder="email"></Input>
          <Input type="text" placeholder="senha"></Input>
          <ButtonContainer>
            <DefaultButtonComponent label={"CONTINUAR"} onClick={redirect} />
          </ButtonContainer>
        </form>
        </FormContainer>
      </LoginContainer>
			<Footer>
				<LogoTopocart src={logoTopocart}/>
			</Footer>
    </ContainerBackground>
  );
};

export default LoginPage;
