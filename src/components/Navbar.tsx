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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    flexGrow: {
      flexGrow: 1
    },
    navButton: {
      marginLeft: theme.spacing(1)
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,

      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
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
      color: "inherit",
      border: "1px solid " + theme.palette.divider,
      borderRadius: 25
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
          <PrimaryButton className={classes.navButton}>Sign out</PrimaryButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
