import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import packageJson from "../../../package.json";
import { useLoading } from "../../hooks/useLoading";
import { getGroups, getUsers } from "../../services/easy";
import { authLdap } from "../../services/ldap";
// import loader from "./../../assets/loader.svg";
// import background from "./../../assets/login-background.jpg";
// import logoTopocart from "./../../assets/logo_topocart.png";
import { Version } from "./styles";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { loading, setLoading } = useLoading();

  async function onSubmit(data: any) {
    const user = data.Usuario;
    const password = data.Senha;

    setLoading(true);

    try {
      if (user === "victor.santos") {
        // TODO
        const ldap = await authLdap(user, password);

        if (ldap.status !== 200) {
          ldap.status === 401
            ? toast.error("Usuário ou senha inválidos")
            : toast.error("Erro ao autenticar usuário");
          return;
        }
        toast.info(
          "Usuário autenticado com sucesso, recuperando informações do Easy Project. Por favor, aguarde...",
        );
      } else {
        toast.info(
          "Modo de desenvolvedor ativado, autenticação LDAP desativada. Recuperando informações do Easy Project. Por favor, aguarde...",
        );
      }

      const users = await getUsers();
      const foundUser = users!.find((e) => e.login == user);

      if (foundUser) {
        history.push({
          pathname: "/atividades",
          state: {
            user: { ...foundUser, type: "user" },
          },
        });
      }

      const groups = await getGroups();
      const foundGroup = groups!.find((e) => e.name == user);

      if (foundUser == undefined && foundGroup == undefined) {
        toast.error(
          `O usuário ${user} não foi encontrado no Easy Project, verifique com seu líder.`,
        );
      } else {
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
      console.log("Erro no login:", e);
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message);
      } else {
        toast.error(
          "Ocorreu um erro desconhecido, tente novamente mais tarde.",
        );
        toast.error(e);
      }
    } finally {
      setLoading(false);
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
        // backgroundImage: `url(${background})`, TODO
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          paddingBottom: "3rem",
          textShadow: "4px 4px 8px #000000",
        }}
      >
        Gerenciador de <b>Atividades</b>
      </Typography>

      <Divider />

      <Card
        sx={{
          width: "400px",
          backgroundColor: "rgba(0, 0, 0, 0.611)",
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
                disabled={loading}
                sx={{
                  padding: "1rem",
                }}
              >
                {!loading ? (
                  "Acessar"
                ) : (
                  <>{/*<Loader src={loader}></Loader>*/}&nbsp;&nbsp;Acessando</>
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
        {/* <LogoTopocart src={logoTopocart} /> */}
        <Version>Versão {packageJson.version}</Version>
      </Box>
    </Box>
  );
}
