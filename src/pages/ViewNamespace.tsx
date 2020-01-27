import React, { useEffect, useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  Typography,
  Grid,
  Breadcrumbs,
  Divider,
  TextField,
  Paper,
  Table
} from "@material-ui/core";
import {
  Link as ReactRouterLink,
  useLocation,
  useParams
} from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import PrimaryButton from "../components/shared/PrimaryButton";
import useApi from "../hooks/useApi";
import { CircularProgress, fade } from "@material-ui/core";
import useNamespaces from "../hooks/useNamespaces";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";

interface Namespace {
  [key: string]: any;
  name: string;
  url: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { marginTop: theme.spacing(2), marginBottom: theme.spacing(2) },

    breadCrumb: {
      marginBottom: theme.spacing(2)
    },
    form: { marginTop: theme.spacing(2) },
    formPaper: { padding: theme.spacing(2) },
    formField: {
      marginTop: theme.spacing(2)
    },
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1)
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2)
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
        width: 200
      }
    }
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Paper>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    </Paper>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const ViewNamespace: React.FC = () => {
  const classes = useStyles();
  const { namespaceId } = useParams();
  const { namespaces } = useNamespaces();
  const namespace: any = namespaces.find(n => n.namespaceId == namespaceId);
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(pathname.endsWith("/setup") ? 1 : 0);
  const [threads, setThreads] = useState([]);
  const { get } = useApi();
  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchString(e.target.value);
  };
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getThreads = async () => {
      let response: any = await get("/Thread/Search", {
        namespaceId: namespaceId
      });
      if (response.success) {
        setThreads(response.data);
      }
    };
    getThreads();
  }, []);

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="Breadcrumb"
        className={classes.breadCrumb}
      >
        <Link color="inherit" component={ReactRouterLink} to="/namespaces">
          <Typography variant="h6">Namespaces ({namespaces.length})</Typography>
        </Link>
        <Typography variant="h6" color="textPrimary">
          {namespace?.name}
        </Typography>
      </Breadcrumbs>
      <Divider />

      <div className={classes.form}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            TabIndicatorProps={{ color: "primary" }}
          >
            <Tab label={"Threads (" + threads.length + ")"} {...a11yProps(0)} />
            <Tab label="Setup" {...a11yProps(1)} />
            <Tab label="Options" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
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
              onChange={handleSearchChange}
            />
          </div>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow color="secondary">
                  <TableCell align="center">Identifier</TableCell>
                  <TableCell align="center">Created On</TableCell>
                  <TableCell align="center">Comments</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {threads.map((thread: any) => (
                  <TableRow key={thread.threadId} hover>
                    <TableCell component="th" scope="row" align="center">
                      {thread.identifier}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(thread.createdOn + "Z").toLocaleDateString() +
                        " " +
                        new Date(thread.createdOn + "Z").toLocaleTimeString()}
                    </TableCell>
                    <TableCell align="center">{thread.comments}</TableCell>
                    <TableCell align="center">
                      <PrimaryButton
                        size="small"
                        component={ReactRouterLink}
                        to={
                          "/namespaces/" +
                          thread.namespace.namespaceId +
                          "/" +
                          thread.threadId
                        }
                      >
                        View
                      </PrimaryButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Auto approve comments, Allowed origins, pause thread creation, allow
          threads to only be created from certain Ip
        </TabPanel>
      </div>
    </div>
  );
};

export default ViewNamespace;
