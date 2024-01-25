import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { Issues } from "../../../interfaces";

export default function GestorCard(props: {
    selectedIssue: Issues | undefined;
    handleTaskClick: () => void;
    task: Issues;
}) {
    const theme = useTheme()
    return <Box
        sx={{
            width: "100%",
            minWidth: "100%",
        }}
    >
        <Card
            sx={{
                width: "100%",
                marginTop: "2%",
                backgroundColor:
                props.selectedIssue?.id === props.task.id
                    ? theme.palette.success.dark
                    : theme.palette.primary.dark,
                ":hover": {
                backgroundColor: 
                    props.selectedIssue?.id === props.task.id
                    ? theme.palette.success.light
                    : theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
                }
            }}
            onClick={props.handleTaskClick}
        >
        <CardContent>
            <Typography
            variant="caption"
            color="text.secondary"
            component={"a"}
            target="_blank"
            href={`https://topocart.easyredmine.com/issues/${props.task.id}`}
            >
            #{props.task.id} - {props.task.status.name}
            </Typography>
            <Typography variant="h6">{props.task.subject}</Typography>
            <Typography variant="caption">{props.task.project.name}</Typography>
        </CardContent>
        </Card>
    </Box>
}