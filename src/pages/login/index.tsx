import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageJson from "./../../../package.json";
import loader from "/loader.svg";
import logoTopocart from "/logo_topocart.png";

import api from "../../services/api";
import {
  ContainerBackground,
  ContainerTitle,
  Footer,
  FormContainer,
  LabelContainer,
  Loader,
  LoginContainer,
  LogoTopocart,
  Title,
  Version,
} from "./styles";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    let user = data.Usuario;
    let password = data.Senha;

    setIsLoading(true);
    const response = await api.get("/users.json");
    let foundUser = response.data.users.find((e: any) => e.login == user);

    if (foundUser == undefined) {
      setIsLoading(false);
      toast.error(
        `O usuário ${user} não foi encontrado no Easy Project, verifique com seu líder.`,
      );
    } else {
      setIsLoading(false);
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
            <TextField
              type="text"
              placeholder="Nome de usuário"
              {...register("Usuario", { required: "Este campo é obrigatório" })}
            />
            <TextField
              type="password"
              placeholder="Senha"
              {...register("Senha", { required: true })}
            />
            {/* {errors.Senha && <SpanError>Este campo é obrigatório</SpanError>} */}
            <Button type="submit" disabled={isLoading}>
              {!isLoading ? (
                "Acessar"
              ) : (
                <>
                  <Loader src={loader}></Loader>&nbsp;&nbsp;Acessando
                </>
              )}
            </Button>
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
