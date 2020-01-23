import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  fade
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RoundedButton from "./shared/RoundedButton";
import PrimaryButton from "./shared/PrimaryButton";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    flexGrow: {
      flexGrow: 1
    },
    navButton: {
      marginLeft: theme.spacing(1)
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      borderRadius: 25,
      backgroundColor: fade(grey[500], 0.15),
      "&:hover": {
        backgroundColor: fade(grey[500], 0.25)
      }
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    }
  })
);

export default function Navbar({ ...props }) {
  const classes = useStyles();
  const { isAuthenticated, claims, logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" {...props} elevation={0}>
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.flexGrow} />
          <Typography>
            {isAuthenticated
              ? "Signed in as " + claims.email
              : "not authenticated"}
          </Typography>
          <PrimaryButton className={classes.navButton} onClick={handleLogout}>
            Sign out
          </PrimaryButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
