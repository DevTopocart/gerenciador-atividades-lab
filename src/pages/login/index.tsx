import React from "react";
import { useForm,Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import logoTopocart from "./../../assets/logo_topocart.png";
import packageJson from "./../../../package.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ContainerBackground,
  ButtonContainer,
  ContainerTitle,
  Input,
  Footer,
  LabelContainer,
  LoginContainer,
  LogoTopocart,
  SpanError,
  InputSubmit,
  FormContainer,
  Title,
  Version,
} from "./styles";
import api from "../../services/api";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const onSubmit = async (data: any) => {
    let user = data.Usuario;
    let password = data.Senha;

    const response = await api.get("/users.json");
    let foundUser = response.data.users.find((e: any) => e.login == user);

    if (foundUser == undefined) {
      toast.error(
        `O usuário ${user} não foi encontrado no Easy Project, verifique com seu líder.`
      );
    } else {
      history.push({
        pathname: "/activities",
        state: { user: foundUser },
      });
    }
  };

  return (
    <ContainerBackground>
      <ContainerTitle>
        <Title>Gerenciador de Atividades</Title>
      </ContainerTitle>

      <LoginContainer>
        <LabelContainer>
          <h4>Acesse com seu usuário e senha dos sistemas Topocart</h4>
        </LabelContainer>

        <FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Nome de usuário"
              {...register("Usuario", { required: "Este campo é obrigatório" })}
            />
            {errors.Usuario && <SpanError>Este campo é obrigatório</SpanError>}
            <Input
              type="password"
              placeholder="Senha"
              {...register("Senha", { required: true })}
            />
            {errors.Senha && <SpanError>Este campo é obrigatório</SpanError>}
            <InputSubmit type="submit"> Acessar</InputSubmit>
            
          </form>
        </FormContainer>
      </LoginContainer>
      <Footer>
        <LogoTopocart src={logoTopocart} />
        <Version>Versão {packageJson.version}</Version>
      </Footer>
    </ContainerBackground>
  );
};

export default LoginPage;
