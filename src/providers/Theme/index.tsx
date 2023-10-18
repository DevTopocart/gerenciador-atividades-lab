import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export function getPreferredMode() {
  // Check if the user has set their system to prefer dark mode
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkMode ? "dark" : "light";
}

const theme = createTheme({
  palette: {
    mode: getPreferredMode(),
    primary: {
      main: "#333840",
    },
    secondary: {
      main: "#009c66",
    },
    success: {
      main: "#78d23d",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 12,
  },
});

export default function Theme({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
