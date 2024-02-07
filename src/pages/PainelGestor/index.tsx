import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Slide,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { FullPageLoader } from "../../components/FullPageLoader";
import { useLoading } from "../../hooks/useLoading";
import { Loader } from "../login/styles";

import AddTaskIcon from '@mui/icons-material/AddTask';
import Groups2Icon from "@mui/icons-material/Groups2";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { forwardRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TransitionProps } from "react-transition-group/Transition";
import loader from "../../assets/loader.svg";
import background from "../../assets/login-background.jpg";
import usePainelGestor from "../../hooks/usePainelGestor";
import { GroupsWithIssues, Issues, UsersWithIssues } from "../../interfaces";
import { addIssueToGroup, getAllIssuesFromSubordinates, getGroups, getIssues, getUsers, removeIssueFromGroup } from "../../services/easy";
import { filter2ndElementFrom3PartsArray } from "../../utils/filter2ndElementFrom3PartsArray";
import { filterIssuesBySearchKey } from "../../utils/filterIssuesBySearchKey";
import CardPainelGestor from "./CardPainelGestor";

export default function PainelGestor() {
  const location: any = useLocation();
  const user = location.state.user;

  const history = useHistory();
  const theme = useTheme();
  const { loading, setLoading } = useLoading();

  const [openUserSelector,setOpenUserSelector] = useState(false)
  const [issueToAssign,setIssueToAssign] = useState<Issues>()

  const [searchKey,setSearchKey] = useState("")

  const gestor = usePainelGestor()

  useEffect(() => {
    setLoading(true)
    fetchSubordinatesAndIssues().then(() => setLoading(false))
  },[])

  async function fetchSubordinatesAndIssues() {
    const allGroups = await getGroups()
    const allUsers = await getUsers()

    let groupsSupervised: GroupsWithIssues[] = allGroups?.filter(e => e.custom_fields?.find(e => e.id === 124)?.value === user.id)!
    let usersSupervised: UsersWithIssues[] = allUsers?.filter(e => e.supervisor_user_id === user.id || e.id === user.id)!

    let issuesIdsCurrentlyWorkedByGroups = new Set()

    groupsSupervised?.forEach((e,i,a) => {
      let issuesIds = filter2ndElementFrom3PartsArray(e.custom_fields!.find(e => e.id === 130)?.value as Array<string>)
      
      issuesIds.forEach(e => issuesIdsCurrentlyWorkedByGroups.add(e))
    })

    const issuesFromSubordinates = await getAllIssuesFromSubordinates(
      [...usersSupervised!.map(e => e.id), ...groupsSupervised!.map(e => e.id)],
      0, 
      25, 
      [],
      Array.from(issuesIdsCurrentlyWorkedByGroups) as Array<number>
    )
    if (!issuesFromSubordinates || issuesFromSubordinates.length === 0) toast.info("Nenhuma atividade encontrada")

    issuesFromSubordinates?.forEach((issue,i,a) => {
      groupsSupervised?.forEach((group) => {
        let issuesIdsFromGroup = filter2ndElementFrom3PartsArray(group.custom_fields?.find(e => e.id === 130 && e.field_format === 'easy_lookup')?.value as Array<number | string>) 

        if (issuesIdsFromGroup.includes(issue.id)) {
          group.issues ? group.issues.push(issue) : group.issues = [issue]               
        }
      })

      if (i === a.length - 1) gestor.setGroups(groupsSupervised)
    })

    const issuesFromGestor = await getIssues(user.id)
    
    const gestorIndex = usersSupervised.findIndex(e => e.id === user.id);

    if (gestorIndex !== -1) {
      const updatedGestor = { ...usersSupervised[gestorIndex] };
      updatedGestor.issues = issuesFromGestor || [];
      usersSupervised[gestorIndex] = updatedGestor;
    }

    gestor.setUsers(usersSupervised|| [])
  }

  function handleGoToAtividades() {
    history.push("/atividades", location.state);
  }

  async function handleTaskClickOnGroup(event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, issue: Issues, group: GroupsWithIssues) {

    if(event.shiftKey) {
      console.log(event)
      setOpenUserSelector(true)
      setIssueToAssign(issue)
      return
    }

    setLoading(true)
    if (group.issues?.map(e => e.id).includes(issue.id)) {
      try {
        
        await removeIssueFromGroup(group.id, issue.id)
        gestor.setGroups(gestor.groups?.map(e => e.id === group.id ? {...e, issues: e.issues?.filter(e => e.id !== issue.id)} : e)!)
        toast.success(`A atividade ${issue.subject} foi removida do usuário ${group.name}`)
      } catch (error) {
        toast.error(`Houve um erro ao remover a atividade ${issue.subject} do usuário ${group.name}`)
      } finally {
        setLoading(false)
      }
    } else {
      try {
        
        await addIssueToGroup(group.id, issue.id)
        gestor.setGroups(gestor.groups?.map(e => e.id === group.id ? {...e, issues: e.issues ? [...e.issues, issue] : [issue]} : e)!)
        toast.success(`A atividade ${issue.subject} foi adicionada ao usuário ${group.name}`)
      } catch (error) {
        toast.error(`Houve um erro ao adicionar a atividade ${issue.subject} ao usuário ${group.name}`)
      } finally {
        setLoading(false)
      }
    }
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
      
      <Dialog
        open={openUserSelector}
        onClose={() => setOpenUserSelector(false)}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="lg"
      >
        {issueToAssign && <DialogContent>
          <Typography variant="h6">Selecione os usuários para atribuir à esta tarefa:</Typography>
          <Divider></Divider>
          {
            gestor.groups?.map((group,i) => 
              <Box key={i} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6">{group.name}</Typography>
                <IconButton onClick={(event) => handleTaskClickOnGroup(event,issueToAssign!,group)}>
                  {group.issues?.map(e => e.id).includes(issueToAssign.id) ? <RemoveCircleIcon color="warning" /> : <AddTaskIcon color="success" /> }
                </IconButton>
              </Box>
            )
          }
        </DialogContent>}
      </Dialog>

      <Box
        id="header"
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
            Logado como {user.firstname}{" "}
            {user.lastname}
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
        }}
      >
        <TextField
          fullWidth
          label="Pesquisar atividade ou projeto"
          variant="standard"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </Box>

      <Box
        id="content"
        sx={{
          width: "90%",
          height: "80%",
          maxHeight: "80%",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
        }}
      >
        {
          !loading && 
          gestor.groups && gestor.groups.length === 0 && 
          gestor.users && gestor.users.length === 0 && 
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "50%",
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
          </Box>}

          <Divider
            sx={{
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(2),
            }}
          />

          {
            gestor.groups && gestor.groups.length > 0 &&
            gestor.groups.map((group,i) => 
              <Box
                key={i}
                sx={{
                  marginTop: theme.spacing(1),
                  marginRight: theme.spacing(2),
                  width: "300px",
                  minWidth: "300px",
                  height: '90%',
                }}
              >
                <Typography variant="h5">
                  {group.name}
                  {/* : {group.issues?.map(e => e.id).join(", ")} */}
                </Typography>
                <Typography
                  variant="caption"
                  component={"div"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Usuário Interno da Topocart &nbsp;
                  <Tooltip title="Caso a tarefa que deseja não esteja sendo exibida, certifique-se de que você ou o usuário esteja atribuido à ela como Responsável ou como Colaborador">
                    <HelpIcon sx={{ cursor: "help" }} fontSize="small" />
                  </Tooltip>
                </Typography>

                <Box
                  sx={{
                    marginTop: theme.spacing(1),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
                    minHeight: "90%",
                    maxHeight: "90%",
                    overflowY: "auto",
                  }}
                >
                  {
                    gestor.issues && gestor.issues.length > 0 &&
                    gestor.issues
                    .filter(i => filterIssuesBySearchKey(searchKey,i))
                    .sort((a,b) => {
                      return group.issues?.map(e => e.id).includes(a.id) ? -1 : 1
                    }).map((issue,i) => 
                      <CardPainelGestor
                        key={i}
                        isSelected={group.issues?.map(e => e.id).includes(issue.id) ? true : false}
                        handleTaskClick={e => handleTaskClickOnGroup(e,issue,group)}
                        issue={issue}
                      />
                    )
                  }
                </Box>
              </Box>
            )
          }


      </Box>
      <Typography
        variant="caption"
      >
        DICA: Pressione <b>SHIFT</b> e selecione uma tarefa para atribui-la a multiplos usuários
      </Typography>
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
  