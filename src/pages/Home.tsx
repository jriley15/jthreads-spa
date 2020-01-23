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
import { useLocation, useHistory } from "react-router";
import * as queryString from "query-string";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {}
  })
);

const Home: React.FC = () => {
  const classes = useStyles();

  const { search } = useLocation();
  const queryParams = queryString.parse(search);
  const { login } = useAuth();
  const history = useHistory();

  console.log(queryParams);

  if (queryParams.token) {
    login(queryParams.token as string);
    history.push("/");
  }

  return <div className={classes.root}>Home</div>;
};

export default Home;
