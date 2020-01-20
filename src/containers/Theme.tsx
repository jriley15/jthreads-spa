import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

/**
 * Material UI Theme
 */

const theme = createMuiTheme({
  palette: {
    //type: "dark",
    primary: {
      main: "rgb(255, 255, 255)"
    }
    /*primary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff"
    },
    background: {
      paper: "#fff",
      default: "rgb(249, 249, 251)"
    }*/
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "system-ui",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    button: {
      textTransform: "none"
    }
  }
});

const CustomTheme: React.FC = (props: any) => {
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
};

export default CustomTheme;
