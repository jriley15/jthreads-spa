import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Typography,
  Box,
  Theme,
  fade,
  Breadcrumbs,
  Divider
} from "@material-ui/core";
import PrimaryButton from "../components/shared/PrimaryButton";
import { Link as ReactRouterLink, useParams } from "react-router-dom";
import useNamespaces from "../hooks/useNamespaces";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import useApi from "../hooks/useApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {},
    topActions: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
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
        width: 200
      }
    },
    heading: { marginBottom: theme.spacing(2) },
    breadCrumb: {
      marginBottom: theme.spacing(2)
    }
  })
);

export default function ViewThread() {
  const classes = useStyles();
  const { namespaceId, threadId } = useParams();
  const { namespaces } = useNamespaces();
  const namespace: any = namespaces.find(n => n.namespaceId == namespaceId);
  const [searchString, setSearchString] = useState("");
  const [comments, setComments] = useState([]);
  const { get } = useApi();
  const [thread, setThread] = useState<any>({});

  useEffect(() => {
    const getComments = async () => {
      let response: any = await get("/Comment/Search", { threadId: threadId });
      if (response.success) {
        setComments(response.data);
      }
    };
    const getThread = async () => {
      let response: any = await get("/Thread/Search", {
        namespaceId: namespaceId,
        threadId: threadId
      });
      if (response.success) {
        setThread(response.data[0]);
      }
    };
    getThread();
    getComments();
  }, []);

  const handleSearchChange = (e: any) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <div className={classes.topActions}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="Breadcrumb"
          className={classes.breadCrumb}
        >
          <Link color="inherit" component={ReactRouterLink} to="/namespaces">
            <Typography variant="h6">
              Namespaces ({namespace?.threads})
            </Typography>
          </Link>
          <Link
            color="inherit"
            component={ReactRouterLink}
            to={"/namespaces/" + namespaceId}
          >
            <Typography variant="h6">{namespace?.name}</Typography>
          </Link>
          <Typography variant="h6" color="textPrimary">
            {thread?.identifier}
          </Typography>
        </Breadcrumbs>
        <Divider />
      </div>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Body</TableCell>
              <TableCell align="center">Created On</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment: any) => (
              <TableRow key={comment.commentId} hover>
                <TableCell component="th" scope="row" align="center">
                  {comment.user?.email}
                </TableCell>
                <TableCell align="center">{comment.body}</TableCell>
                <TableCell align="center">
                  {new Date(comment.createdOn + "Z").toLocaleDateString() +
                    " " +
                    new Date(comment.createdOn + "Z").toLocaleTimeString()}
                </TableCell>
                <TableCell align="center">
                  <PrimaryButton
                    to={"/namespaces/" + namespace.namespaceId}
                    size="small"
                  >
                    View
                  </PrimaryButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
