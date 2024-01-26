import Groups2Icon from "@mui/icons-material/Groups2";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { TransitionProps } from "react-transition-group/Transition";
import { FullPageLoader, Loader } from "../../components/FullPageLoader";
import { useLoading } from "../../hooks/useLoading";
import { Group, Issues, MinifiedUser, User } from "../../interfaces";
import {
  getAllIssuesFromSubordinates,
  getCurrentActivityForGroup,
  getGroups,
  getUsers,
  setCurrentActivityForGroup
} from "../../services/easy";
import { filterIssuesBySearchKey } from "../../utils/filterIssuesBySearchKey";
import { filterIssuesByStatus } from "../../utils/filterIssuesByStatus";
import loader from "./../../assets/loader.svg";
import background from "./../../assets/login-background.jpg";
import GestorCard from "./GestorCard";
import { useGestor } from "./hooks";

export default function Gestor() {
  const location: any = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const { loading, setLoading } = useLoading();

  const [usersSubordinates, setUserSubordinates] = useState<User[]>();
  const [groupSubordinates, setGroupSubordinates] = useState<Group[]>();
  const {groupSelector,setGroupSelector} = useGestor()
  const [issues, setIssues] = useState<Issues[]>([]);
  const [searchkey, setSearchkey] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchUsers();
    toast.info('Pressione SHIFT para selecionar uma atividade para vários usuários')
  }, []);

  useEffect(() => {
    if (!usersSubordinates || !groupSubordinates) return;
    fetchIssues().then(() => setLoading(false));
  }, [usersSubordinates, groupSubordinates]);

  useEffect(() => {
    if (!groupSelector.isOpen) return;
    setLoading(true);
    fetchIssues().then(() => setLoading(false));
  },[groupSelector])

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
    let uniqueGroupSubordinated = Array.from(
      groupsSubordinated!
        .reduce((map, item) => {
          return map.has(item.id) ? map : map.set(item.id, item);
        }, new Map())
        .values(),
    );
    setGroupSubordinates(uniqueGroupSubordinated || []);
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
      {loading && (
        <FullPageLoader>
          <Loader src={loader}></Loader>
        </FullPageLoader>
      )}

      <Box
        sx={{
          width: "90%",
          height: "5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          marginBottom: "3%",
        }}
      >
        <TextField
          fullWidth
          label="Pesquisar atividade ou projeto"
          variant="standard"
          onChange={(e) => setSearchkey(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          width: "90%",
          height: "75%",
          maxHeight: "75%",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
        }}
      >
        {!usersSubordinates && !groupSubordinates && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              textAlign={"center"}
              sx={{
                marginTop: "20%",
                width: "80%",
              }}
            >
              Não existe nenhum colaborador que possua você cadastrado como
              supervisor. Se for o caso, solicite a inclusão no EasyProject pela
              TI - Produção enviando um email para{" "}
              <b>ti.prod@topocart.dev.br</b>
            </Typography>
          </Box>
        )}

        {groupSubordinates &&
          groupSubordinates.length > 0 &&
          issues &&
          groupSubordinates.map((user, index) => {
            return (
              <SeletorAtividadeParaGrupos
                key={index}
                user={{ name: user.name, id: user.id }}
                users={groupSubordinates!}
                issues={
                  issues
                    .filter((issue) =>
                      filterIssuesBySearchKey(searchkey, issue),
                    )
                    .filter((issue) => filterIssuesByStatus(issue))!
                }
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
                issues={
                  issues
                    .filter((issue) => {
                      return (
                        issue.assigned_to && issue.assigned_to.id === user.id
                      );
                    })
                    .filter((issue) =>
                      filterIssuesBySearchKey(searchkey, issue),
                    )
                    .filter((issue) => filterIssuesByStatus(issue))!
                }
                loading={loading}
                setLoading={setLoading}
              />
            );
          })}
      </Box>
    </Box>
  );
}

function SeletorAtividadeParaGrupos(props: {
  user: MinifiedUser;
  users: Group[];
  issues: Issues[];
}) {
  const theme = useTheme();
  const { loading, setLoading } = useLoading();
  const {groupSelector,setGroupSelector} = useGestor()
  const [selectedIssue, setSelectedIssue] = useState<Issues>();

  useEffect(() => {
    getCurrentActivityForGroup(props.user.id).then(
      (data) => data && setSelectedIssue(data[0]),
    );
  }, []);

  async function handleUserSelectionClose() {
    
    setLoading(true);

    let groupsToUnassign = props.users.filter(foo => !groupSelector.groupsToAssign.map(bar => bar.id).includes(foo.id))
    
    groupSelector.groupsToAssign.forEach(async (group) => {

      await setCurrentActivityForGroup(group.id, groupSelector.selectedIssue!.id).then(() => {
        setLoading(false);
        toast.success(
          `A atividade "${selectedIssue!.subject}" foi selecionada para o colaborador ${group.name}`,
        );
      });
    })

    groupsToUnassign.forEach(async (group) => {

      if (props.users.find(e => e.id === group.id)!.custom_fields?.find(e => e.id === 125)!.value !== groupSelector.selectedIssue!.id) return // nao remove a atividade se nao for a sua atual

      await removeCurrentActivityForGroup(group.id).then(() => {
        setLoading(false);
        toast.success(
          `A atividade "${selectedIssue!.subject}" foi removida do colaborador ${group.name}`,
        );
      });
    })
    
    setSelectedIssue(groupSelector.selectedIssue);
    setGroupSelector({isOpen: false, selectedIssue: undefined, groupsToAssign: []});
  }

  async function handleTaskClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, issue: Issues) {
    
    if (e.shiftKey) {
  
      setGroupSelector({isOpen: true, selectedIssue: issue, groupsToAssign: props.users.filter(user => user.custom_fields?.find(e => e.id === 125)!.value === issue.id)});
    } else {
      
      setLoading(true);

      await setCurrentActivityForGroup(props.user.id, issue.id).then(() => {
        setLoading(false);
        toast.success(
          `A atividade "${issue.subject}" foi selecionada para o colaborador ${props.user.name}`,
        );
      });
  
      setSelectedIssue(issue);
    }
  }

  let issues = selectedIssue
    ? [selectedIssue, ...props.issues.filter((e) => e.id !== selectedIssue.id)]
    : props.issues;

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "300px",
        padding: theme.spacing(1),
      }}
    >
      <Dialog
        open={groupSelector.isOpen}
        onClose={() => handleUserSelectionClose()}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography variant="h5" gutterBottom>Selecione os usuários que executarão esta tarefa</Typography>
          <Divider/>
          <List>
            {props.users.map((user, index) => {
              return (
                <ListItem key={index}>
                  <ListItemButton dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          disableRipple
                          checked={groupSelector.groupsToAssign.map(e => e.id).includes(user.id)}
                          sx={{
                            "&.Mui-checked": {
                              color: theme.palette.success.light,
                            }
                          }}
                          onChange={e => e.target.checked ? setGroupSelector((current) => ({...current, groupsToAssign: [...current.groupsToAssign, user]})) : setGroupSelector((current) => ({...current, groupsToAssign: [...current.groupsToAssign.filter(e => e.id !== user.id)]}))}
                        />
                      </ListItemIcon>
                      <ListItemText  primary={user.name} secondary={`Atividade atual: ${user.custom_fields?.find(e => e.id === 125)?.name}`} />
                    </ListItemButton>
                </ListItem>)
            })}
          </List>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <Button variant="contained" color="success" sx={{width: '100px'}} onClick={() => handleUserSelectionClose()}>OK</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Typography variant="h5">{props.user.name}</Typography>
      <Typography
        variant="caption"
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        Usuário Interno da Topocart &nbsp;
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
          maxHeight: "85%",
          overflowY: "auto",
        }}
      >
        {issues.map((task, index) => {
          return (
            <GestorCard
              key={index}
              selectedIssue={selectedIssue}
              handleTaskClick={e => handleTaskClick(e, task)}
              task={task}
            />
          );
        })}
      </Box>
    </Box>
  );
}

function SeletorAtividadeParaUsuarios(props: {
  user: User;
  issues: Issues[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();

  function handleTaskClick() {
    toast.warning(
      "Você não pode selecionar uma atividade para um usuário do Easy Project, apenas para usuários internos da Topocart",
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "300px",
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
          maxHeight: "85%",
          overflowY: "auto",
        }}
      >
        {props.issues.map((task, index) => {
          return (
            <GestorCard
              key={index}
              selectedIssue={undefined}
              handleTaskClick={handleTaskClick}
              task={task}
            />
          );
        })}
      </Box>
    </Box>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
