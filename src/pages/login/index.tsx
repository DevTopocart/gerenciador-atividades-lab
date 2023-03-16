import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import logoTopocart from './../../assets/logo_topocart.png'
import packageJson from './../../../package.json'

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
  Title,
  Version
} from "./styles";
import api from "../../services/api";

const LoginPage: React.FC = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  
  // console.log(errors);
  const onSubmit = async (data:any) =>{ 

    let user = data.Usuario
    let password = data.Senha

    const response = await api.get('/users.json');

    let users = response.data.users.map((e: any) => {return {"id_user": e.id, "intranet": e.custom_fields.filter((l: any) => l.name == 'Usuario da Intranet')[0].value}})
    let authUser = users.filter((e: any) => e.intranet == `user.1`)[0].id_user
    
    console.log("🚀 ~ file: index.tsx:40 ~ onSubmit ~ authUser:", authUser)

    history.push({
      pathname: '/activities',
      state: {user: authUser}
    });

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
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Usuario" {...register("Usuario", {required: true})} />
          <input type="password" placeholder="Senha" {...register("Senha", {required: true})} />

          <input type="submit" />
        </form>
        </FormContainer>
      </LoginContainer>
			<Footer>
				<LogoTopocart src={logoTopocart}/>
        <Version>
					Versão {packageJson.version}
				</Version>
			</Footer>
    </ContainerBackground>
  );
};

export default LoginPage;
