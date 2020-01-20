import React from "react";
import Routes from "./Routes";
import Navbar from "../components/Navbar";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContent: {
      padding: theme.spacing(2)
    }
  })
);

const Template: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.mainContent}>
        <Routes />
      </div>
    </>
  );
};

export default Template;
