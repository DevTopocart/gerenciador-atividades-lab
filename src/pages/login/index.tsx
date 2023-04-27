import React, { useState } from "react";
import { useForm,Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import logoTopocart from "./../../assets/logo_topocart.png";
import packageJson from "./../../../package.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../assets/loader.svg"

import {
  ContainerBackground,
  ContainerTitle,
  Input,
  Footer,
  LabelContainer,
  LoginContainer,
  LogoTopocart,
  InputSubmit,
  FormContainer,
  Title,
  Version,
  Loader,
} from "./styles";
import api from "../../services/api";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const[isLoading,setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    let user = data.Usuario;
    let password = data.Senha;

    setIsLoading(true)
    const response = await api.get("/users.json");
    let foundUser = response.data.users.find((e: any) => e.login == user);

    if (foundUser == undefined) {

      setIsLoading(false)
      toast.error(
        `O usuário ${user} não foi encontrado no Easy Project, verifique com seu líder.`
      );
    } else {
      
      setIsLoading(false)
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
              color={(errors.Usuario) ? "#ffbdbd" : "whitesmoke"}
              {...register("Usuario", { required: "Este campo é obrigatório" })}
            />
            <Input
              type="password"
              placeholder="Senha"
              color={(errors.Senha) ? "#ffbdbd" : "whitesmoke"}
              {...register("Senha", { required: true })}
            />
            {/* {errors.Senha && <SpanError>Este campo é obrigatório</SpanError>} */}
            <InputSubmit type="submit">
              {
                (!isLoading) ? 'Acessar' : <><Loader src={loader}></Loader>&nbsp;&nbsp;Acessando</>
              }
            </InputSubmit>
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
