import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Grid
} from "@material-ui/core";
import PrimaryButton from "../components/shared/PrimaryButton";
import RoundedButton from "../components/shared/RoundedButton";
import SecondaryButton from "../components/shared/SecondaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.root}>Home</div>;
};

export default Home;
