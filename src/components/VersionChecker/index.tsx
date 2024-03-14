import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  List,
  ListItem,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { MuiMarkdown, getOverrides } from "mui-markdown";
import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "react-transition-group/Transition";
import packageJson from "../../../package.json";
import { GithubRelease } from "../../interfaces";
import { getLatestRelease } from "../../services/github";

export default function VersionChecker() {
  const [open, setOpen] = useState(false);
  const [latestRelease, setLatestRelease] = useState<GithubRelease>();
  const theme = useTheme();

  const linkColor = "#64B5F6";

  useEffect(() => {
    getLatestRelease().then((release) => {
      setLatestRelease(release);
      const currentVersion = "v" + packageJson.version;

      if (release.tag_name != currentVersion) {
        setOpen(true);
      }
    });
  }, []);

  function formatBody(markdownText: string) {
    console.log("🚀 ~ formatBody ~ markdownText:", markdownText);
    const linkRegex = /\[([^\]]*)\]\(([^)]*)\)/g;

    const textWithoutLinks = markdownText
      .replace(/# \[.*\].*\n/g, "") // Remove version tag
      .replace(linkRegex, "$1") // Remove links;
      .replace("Bug Fixes", "Correções e Melhorias")
      .replace("Features", "Novas Funcionalidades")
      .replace("#", "")
      .replace(/^.|\n./g, (match) => match.toUpperCase());

    return textWithoutLinks;
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" textAlign={`center`} gutterBottom>
            Nova versão disponivel
          </Typography>

          <Box
            sx={{
              width: "100%",
              padding: theme.spacing(2),
            }}
          >
            <Divider></Divider>
          </Box>

          <MuiMarkdown
            overrides={{
              ...getOverrides(),
              h1: {
                component: Typography,
                props: {
                  variant: "h6",
                  gutterBottom: true,
                  textAlign: "center",
                },
              },
              h2: {
                component: Typography,
                props: {
                  variant: "h6",
                  gutterBottom: true,
                  textAlign: "center",
                },
              },
              h3: {
                component: Typography,
                props: {
                  variant: "h5",
                  gutterBottom: true,
                  textAlign: "center",
                },
              },
              p: {
                component: Typography,
                props: {
                  variant: "body2",
                  paragraph: true,
                  textAlign: "center",
                },
              },
              link: {
                component: Typography,
                props: {
                  variant: "body2",
                  style: { color: linkColor, textDecoration: "underline" },
                },
              },
              a: {
                component: Typography,
                props: {
                  variant: "body2",
                  style: { color: linkColor, textDecoration: "underline" },
                },
              },
              ul: { component: List, props: { component: "ul", dense: true } },
              ol: { component: List, props: { component: "ol", dense: true } },
              li: {
                component: ListItem,
                props: {
                  component: "li",
                  dense: true,
                  style: { marginBottom: 4, textAlign: "center" },
                },
              },
            }}
          >
            {formatBody(latestRelease?.body ? latestRelease?.body : "")}
          </MuiMarkdown>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: theme.spacing(2),
              gap: theme.spacing(2),
            }}
          >
            <Button
              variant="contained"
              color="success"
              target="_blank"
              href="https://topocart.s3.amazonaws.com/gerenciador-de-atividades/gerenciador-atividades.msi"
            >
              Download da versão {latestRelease?.tag_name}
            </Button>

            <Typography variant="caption">
              DICA: Clique fora deste painel para fechar as novidades
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
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
