import Groups2Icon from "@mui/icons-material/Groups2";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FullPageLoader, Loader } from "../../components/FullPageLoader";
import { Group, Issues, MinifiedUser, User } from "../../interfaces";
import {
  getAllIssuesFromSubordinates,
  getCurrentActivityForGroup,
  getGroups,
  getUsers,
  setCurrentActivityForGroup,
} from "../../services/easy";
import loader from "./../../assets/loader.svg";
import background from "./../../assets/login-background.jpg";

export default function Gestor() {
  const location: any = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const [usersSubordinates, setUserSubordinates] = useState<User[]>();
  const [groupSubordinates, setGroupSubordinates] = useState<Group[]>();
  const [issues, setIssues] = useState<Issues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!usersSubordinates || !groupSubordinates) return;
    fetchIssues().then(() => setIsLoading(false));
  }, [usersSubordinates, groupSubordinates]);

  function handleGoToAtividades() {
    history.push("/atividades", location.state);
  }

  async function fetchUsers() {
    const users = await getUsers();
    const usersSubordinated = users?.filter((user) => {
      return user.supervisor_user_id === location.state.user.id;
    });
    setUserSubordinates(usersSubordinated || []);

    const groups = await getGroups();
    const groupsSubordinated = groups?.filter((group) => {
      return (
        // 124 é o id do campo customizado que armazena o id do gestor de um grupo
        group.custom_fields?.find((e) => e.id === 124)?.value ===
        location.state.user.id
      );
    });
    setGroupSubordinates(groupsSubordinated || []);
  }

  async function fetchIssues() {
    const subordinatesIds = [
      location.state.user.id,
      ...usersSubordinates?.map((e) => e.id)!,
      ...groupSubordinates?.map((e) => e.id)!,
    ];

    const issues = await getAllIssuesFromSubordinates(subordinatesIds);
    setIssues(issues!);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {isLoading && (
        <FullPageLoader>
          <Loader src={loader}></Loader>
        </FullPageLoader>
      )}

      <Box
        sx={{
          width: "90%",
          height: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Tooltip title="Acessar interface de gestão das minhas atividades">
            <IconButton onClick={handleGoToAtividades}>
              <PersonIcon />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          <IconButton color="success">
            <Groups2Icon />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" gutterBottom>
            Logado como {location.state.user.firstname}{" "}
            {location.state.user.lastname}
          </Typography>
          &nbsp;
          <IconButton size="small" onClick={() => history.push("/")}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          width: "90%",
          height: "85%",
          maxHeight: "85%",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          overflowY: "auto",
          alignContent: "flex-start",
          justifyContent: "center",
        }}
      >
        {!usersSubordinates && !groupSubordinates && (
          <Typography
            textAlign={"center"}
            sx={{
              marginTop: "20%",
              width: "80%",
            }}
          >
            Não existe nenhum colaborador que possua você cadastrado como
            supervisor. Se for o caso, solicite a inclusão no EasyProject pela
            TI - Produção enviando um email para <b>ti.prod@topocart.dev.br</b>
          </Typography>
        )}

        {groupSubordinates &&
          groupSubordinates.length > 0 &&
          issues &&
          groupSubordinates.map((user, index) => {
            return (
              <SeletorAtividadeParaGrupos
                key={index}
                user={{ name: user.name, id: user.id }}
                issues={issues
                  // issues.filter((issue) => {
                  //   return (
                  //     issue.assigned_to &&
                  //     issue.assigned_to.id === location.state.user.id
                  //   );
                  // })
                }
                currentActivity={
                  Number(
                    user.custom_fields?.find((e) => e.id === 125)?.value,
                  ) || 0
                }
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            );
          })}

        {usersSubordinates &&
          usersSubordinates.length > 0 &&
          issues &&
          usersSubordinates.map((user, index) => {
            return (
              <SeletorAtividadeParaUsuarios
                key={index}
                user={user}
                issues={issues.filter((issue) => {
                  return issue.assigned_to && issue.assigned_to.id === user.id;
                })}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            );
          })}
      </Box>
    </Box>
  );
}

function SeletorAtividadeParaGrupos(props: {
  user: MinifiedUser;
  issues: Issues[];
  currentActivity?: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();

  const [selectedIssue, setSelectedIssue] = useState<Issues | undefined>(
    props.currentActivity
      ? props.issues.find((e) => e.id == props.currentActivity)
      : undefined,
  );

  useEffect(() => {
    getCurrentActivityForGroup(props.user.id).then(
      (data) => data && setSelectedIssue(data[0]),
    );
  }, []);

  function handleTaskClick(index: number, issue: Issues) {
    props.setIsLoading(true);
    setCurrentActivityForGroup(props.user.id, issue.id).then(() => {
      props.setIsLoading(false);
      toast.success(
        `A atividade "${issue.subject}" foi selecionada para o colaborador ${props.user.name}`,
      );
    });

    setSelectedIssue(issue);
  }

  let issues = selectedIssue
    ? [selectedIssue, ...props.issues.filter((e) => e.id !== selectedIssue.id)]
    : props.issues;

  return (
    <Box
      sx={{
        width: "50%",
        padding: theme.spacing(1),
      }}
    >
      <Typography variant="h5">{props.user.name}</Typography>
      <Typography
        variant="caption"
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Usuário Interno da Topocart
        &nbsp;
        <Tooltip title="Caso a tarefa que deseja não esteja sendo exibida aqui, certifique-se de que você ou o usuário esteja atribuido à ela como Responsável ou como Colaborador">
          <HelpIcon sx={{ cursor: "help" }} fontSize="small" />
        </Tooltip>
      </Typography>

      <Divider
        sx={{
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      />

      <Box
        sx={{
          maxHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
          overflowY: "auto",
        }}
      >
        {issues.map((task, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
              }}
            >
              <Card
                sx={{
                  width: "98%",
                  padding: "1%",
                  marginTop: "2%",
                  backgroundColor:
                    selectedIssue?.id === task.id ? "primary.main" : "primary",
                  ":hover": {
                    backgroundColor: "primary.main",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleTaskClick(index, task)}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    #{task.id} - {task.status.name}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {task.subject}
                  </Typography>
                  <Typography variant="body2">{task.project.name}</Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="Abrir tarefa no Easy Project">
                    <IconButton
                      size="small"
                      target="_blank"
                      href={`https://topocart.easyredmine.com/issues/${task.id}`}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function SeletorAtividadeParaUsuarios(props: {
  user: User;
  issues: Issues[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "50%",
        padding: theme.spacing(1),
      }}
    >
      <Typography variant="h5">
        {props.user.firstname + " " + props.user.lastname}
      </Typography>
      <Typography
        variant="caption"
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Usuário do Easy Project &nbsp;
        <Tooltip title="A alocação de tarefas de usuários do Easy Project deve ser realizada pelo próprio sistema, assinalando o usuário como Assignee de uma tarefa">
          <HelpIcon sx={{ cursor: "help" }} fontSize="small" />
        </Tooltip>
      </Typography>

      <Divider
        sx={{
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      />

      <Box
        sx={{
          maxHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
          overflowY: "auto",
        }}
      >
        {props.issues.map((task, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: "100%",
              }}
            >
              <Card
                sx={{
                  width: "98%",
                  padding: "1%",
                  marginTop: "2%",
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    #{task.id} - {task.status.name}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {task.subject}
                  </Typography>
                  <Typography variant="body2">{task.project.name}</Typography>
                </CardContent>
                <CardActions>
                  <Tooltip title="Abrir tarefa no Easy Project">
                    <IconButton
                      size="small"
                      target="_blank"
                      href={`https://topocart.easyredmine.com/issues/${task.id}`}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
