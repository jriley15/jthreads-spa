import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Navbar from "./Navbar";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import HomeIcon from "@material-ui/icons/Home";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import HelpIcon from "@material-ui/icons/Help";
import SettingsIcon from "@material-ui/icons/Settings";
import MoneyIcon from "@material-ui/icons/AttachMoney";

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      borderBottom: "1px solid " + theme.palette.divider,
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,

    content: {
      //flexGrow: 1
      //backgroundColor: theme.palette.background.default
      //padding: theme.spacing(3)
      width: "100%",
      maxWidth: 900
    },
    logo: {
      //color: "#6f41f8",
      marginRight: theme.spacing(1)
    },
    sideNav: {
      paddingLeft: theme.spacing(2),
      backgroundColor: "#6f41f8",
      color: "white",
      boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.1)"
    },
    selectedItem: {
      borderLeft: "2px solid #6f41f8",
      color: "#6f41f8",
      backgroundColor: "rgb(111, 65, 248, 0.1);"
    },
    listItem: {
      borderLeft: "2px solid #FFFFFF",
      color: theme.palette.text.secondary
    },
    listItemText: {
      fontWeight: theme.typography.fontWeightMedium
    },
    selectedIcon: {
      color: "#6f41f8"
    },
    iconRoot: {
      minWidth: theme.spacing(5)
    }
  })
);

export default function SideDrawer({ children }: { children: any }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <Navbar className={classes.appBar} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Toolbar className={classes.sideNav}>
          <BlurOnIcon className={classes.logo} fontSize="large" />
          <Typography variant="h6">JThreads</Typography>
        </Toolbar>

        <Divider />
        <List style={{ paddingTop: 0 }}>
          <ListItem
            button
            className={
              location.pathname === "/"
                ? classes.selectedItem
                : classes.listItem
            }
            component={Link}
            to="/"
          >
            <ListItemIcon classes={{ root: classes.iconRoot }}>
              <HomeIcon
                className={
                  location.pathname === "/" ? classes.selectedIcon : ""
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Home"}
              primaryTypographyProps={{ className: classes.listItemText }}
            />
          </ListItem>
          <ListItem
            button
            className={
              location.pathname.startsWith("/namespaces")
                ? classes.selectedItem
                : classes.listItem
            }
            component={Link}
            to="/namespaces"
          >
            <ListItemIcon classes={{ root: classes.iconRoot }}>
              <LibraryBooksIcon
                className={
                  location.pathname.startsWith("/namespaces")
                    ? classes.selectedIcon
                    : ""
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Namespaces"}
              primaryTypographyProps={{ className: classes.listItemText }}
            />
          </ListItem>
          <ListItem
            button
            className={
              location.pathname === "/billing"
                ? classes.selectedItem
                : classes.listItem
            }
            component={Link}
            to="/billing"
          >
            <ListItemIcon classes={{ root: classes.iconRoot }}>
              <MoneyIcon
                className={
                  location.pathname === "/billing" ? classes.selectedIcon : ""
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Billing"}
              primaryTypographyProps={{ className: classes.listItemText }}
            />
          </ListItem>

          <Divider />
          <ListItem
            button
            className={
              location.pathname === "/help"
                ? classes.selectedItem
                : classes.listItem
            }
            component={Link}
            to="/help"
          >
            <ListItemIcon classes={{ root: classes.iconRoot }}>
              <HelpIcon
                className={
                  location.pathname === "/help" ? classes.selectedIcon : ""
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Help"}
              primaryTypographyProps={{ className: classes.listItemText }}
            />
          </ListItem>
          <ListItem
            button
            className={
              location.pathname === "/settings"
                ? classes.selectedItem
                : classes.listItem
            }
            component={Link}
            to="/settings"
          >
            <ListItemIcon classes={{ root: classes.iconRoot }}>
              <SettingsIcon
                className={
                  location.pathname === "/settings" ? classes.selectedIcon : ""
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={"Settings"}
              primaryTypographyProps={{ className: classes.listItemText }}
            />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
