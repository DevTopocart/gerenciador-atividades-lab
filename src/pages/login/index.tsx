import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageJson from "../../../package.json";
import VersionChecker from "../../components/VersionChecker";
import { getGroups, getUsers } from "../../services/easy";
import { authLdap } from "../../services/ldap";
import loader from "./../../assets/loader.svg";
import background from "./../../assets/login-background.jpg";
import logoTopocart from "./../../assets/logo_topocart.png";
import { Loader, LogoTopocart, Version } from "./styles";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: any) {
    let user = data.Usuario;
    let password = data.Senha;

    setIsLoading(true);

    try {
      const ldap = await authLdap(user, password);

      const users = await getUsers();
      const groups = await getGroups();
      let foundUser = users!.find((e) => e.login == user);
      let foundGroup = groups!.find((e) => e.name == user);

      if (foundUser == undefined && foundGroup == undefined) {
        setIsLoading(false);
        toast.error(
          `O usuário ${user} não foi encontrado no Easy Project, verifique com seu líder.`,
        );
      } else {
        setIsLoading(false);
        history.push({
          pathname: "/atividades",
          state: {
            user: foundUser
              ? { ...foundUser, type: "user" }
              : { ...foundGroup, type: "group" },
          },
        });
      }
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <VersionChecker/>

      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{
          paddingBottom: "3rem",
        }}
      >
        Gerenciador de Atividades
      </Typography>

      <Divider />

      <Card
        sx={{
          width: "400px",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography textAlign="center" variant="h6">
                Utilize seu usuário e senha da rede para acessar o sistema.
              </Typography>
              <TextField
                type="text"
                variant="filled"
                placeholder="Nome de usuário"
                sx={{
                  paddingTop: "1rem",
                }}
                {...register("Usuario", {
                  required: "Este campo é obrigatório",
                })}
              />
              <TextField
                type="password"
                variant="filled"
                placeholder="Senha"
                sx={{
                  paddingTop: "1rem",
                }}
                {...register("Senha", { required: "Este campo é obrigatório" })}
              />
              <Divider
                sx={{
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  padding: "1rem",
                }}
              >
                {!isLoading ? (
                  "Acessar"
                ) : (
                  <>
                    <Loader src={loader}></Loader>&nbsp;&nbsp;Acessando
                  </>
                )}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Box
        sx={{
          paddingTop: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoTopocart src={logoTopocart} />
        <Version>Versão {packageJson.version}</Version>
      </Box>
    </Box>
  );
}
