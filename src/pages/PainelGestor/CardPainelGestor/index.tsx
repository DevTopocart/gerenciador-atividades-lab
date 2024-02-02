import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { Issues } from "../../../interfaces";

export default function CardPainelGestor(props: {
  isSelected: boolean;
  handleTaskClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  issue: Issues;
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "98%",
        minWidth: "98%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          marginTop: "2%",
          backgroundColor:
            props.isSelected
              ? theme.palette.success.dark
              : theme.palette.primary.dark,
          ":hover": {
            backgroundColor:
              props.isSelected
                ? theme.palette.success.light
                : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            cursor: "pointer",
          },
        }}
        onClick={props.handleTaskClick}
      >
        <CardContent>
          <Typography
            variant="caption"
            color="text.secondary"
            component={"a"}
            target="_blank"
            href={`https://topocart.easyredmine.com/issues/${props.issue.id}`}
          >
            #{props.issue.id} - {props.issue.status.name}
          </Typography>
          <Typography variant="h6">{props.issue.subject}</Typography>
          {props.issue.name_parent && <Typography variant="caption">Subtarefa de {props.issue.name_parent}</Typography>}
          <br></br>
          <Typography variant="caption">Projeto {props.issue.project.name}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
