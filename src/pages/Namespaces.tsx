import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography, Box, Theme, fade } from "@material-ui/core";
import PrimaryButton from "../components/shared/PrimaryButton";
import { Link } from "react-router-dom";
import useNamespaces from "../hooks/useNamespaces";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { grey } from "@material-ui/core/colors";

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
    heading: { marginBottom: theme.spacing(2) }
  })
);

export default function Namespaces() {
  const classes = useStyles();
  const { namespaces } = useNamespaces();
  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchString(e.target.value);
  };

  return (
    <>
      <div className={classes.topActions}>
        <Typography variant="h6" className={classes.heading}>
          Namespaces ({namespaces.length})
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
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
          <PrimaryButton component={Link} to="/namespaces/create">
            Create Namespace
          </PrimaryButton>
        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Total Threads</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {namespaces
              .filter(
                n =>
                  searchString === "" ||
                  n.name.toLowerCase().includes(searchString.toLowerCase())
              )
              .map(namespace => (
                <TableRow key={namespace.namespaceId} hover>
                  <TableCell component="th" scope="row" align="center">
                    {namespace.name}
                  </TableCell>
                  <TableCell align="center">{namespace.namespaceId}</TableCell>
                  <TableCell align="center">{namespace.threads}</TableCell>
                  <TableCell align="center">
                    <PrimaryButton
                      component={Link}
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
