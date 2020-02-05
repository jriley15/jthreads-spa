import React, { useEffect } from "react";
import Routes from "./Routes";
import Navbar from "../components/Navbar";
import { makeStyles, createStyles, Theme, Backdrop } from "@material-ui/core";
import SideDrawer from "../components/SideDrawer";
import useAuth from "../hooks/useAuth";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContent: {
      padding: theme.spacing(2),
      width: "100%"
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    }
  })
);

const Template: React.FC = () => {
  const classes = useStyles();
  let { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <SideDrawer>
          <div className={classes.mainContent}>
            <Routes />
          </div>
        </SideDrawer>
      ) : (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
};

export default Template;
