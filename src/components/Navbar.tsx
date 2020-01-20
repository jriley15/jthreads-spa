import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RoundedButton from "./shared/RoundedButton";
import PrimaryButton from "./shared/PrimaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    },
    navButton: {
      marginLeft: theme.spacing(1)
    }
  })
);

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            JThreads
          </Typography>
          <RoundedButton className={classes.navButton}>About</RoundedButton>
          <RoundedButton className={classes.navButton}>Sign up</RoundedButton>
          <PrimaryButton className={classes.navButton}>Sign in</PrimaryButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
