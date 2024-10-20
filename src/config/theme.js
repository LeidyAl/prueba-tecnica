import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    color: "primary.950",
  },
  palette: {
    primary: {
      50: "#f3f8f8",
      100: "#dfecee",
      200: "#c3d9de",
      300: "#99bec7",
      400: "#689aa8",
      500: "#4d7f8d",
      600: "#436977",
      700: "#3b5763",
      800: "#364b54",
      900: "#2f3e46",
      950: "#1d292f",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h2: {
          fontWeight: "bolder",
          fontSize: 32,
        },
        h5: {
          fontWeight: "bolder",
          fontSize: 24,
        },
        h6: {
          fontWeight: "bolder",
          fontSize: 20,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperWidthMd: {
          borderRadius: 12,
          padding: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#f3f8f8",
          fontWeight: "bolder",
          background: "#2f3e46",
          ":hover": {
            background: "#1d292f",
          },
        },
      },
    },
  },
});
export default theme;
