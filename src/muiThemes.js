import { createTheme, ThemeProvider } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    ochre: {
      main: "#7b7d97",
      light: "#E9DB5D",
      dark: "#dc67ea",
      contrastText: "#242105",
    },
  },
});


export const scaryTheme = createTheme({
  palette: {
    ochre: {
      main: "#7b7d97",
      light: "#E9DB5D",
      dark: "red",
      contrastText: "#242105",
    },
  },
});
