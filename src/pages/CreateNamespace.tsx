import React from "react";
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
  Backdrop
} from "@material-ui/core";
import { Link as ReactRouterLink, useHistory } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import { Formik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "../components/shared/PrimaryButton";
import SecondaryButton from "../components/shared/SecondaryButton";
import useApi from "../hooks/useApi";
import { CircularProgress } from "@material-ui/core";
import useNamespaces from "../hooks/useNamespaces";

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    }
  })
);

const CreateNamespace: React.FC = () => {
  const classes = useStyles();
  const initialValues: Namespace = { name: "test name", url: "test url" };
  const { post } = useApi();
  const { namespaces, fetchNamespaces } = useNamespaces();
  const history = useHistory();

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
          Create
        </Typography>
      </Breadcrumbs>
      <Divider />

      <div className={classes.form}>
        <Paper className={classes.formPaper}>
          <Typography color="textSecondary">
            Fill out the fields below
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={async (data, { setSubmitting, resetForm, setErrors }) => {
              console.log("submitting");
              setSubmitting(true);
              let response: any = await post("/Namespace/Create", data);
              if (response.success) {
                //resetForm();
                //setOpen(false)
                await fetchNamespaces();
                history.push(
                  "/namespaces/" + response.data.namespaceId + "/setup"
                );
              } else {
                setErrors(response.errors);
              }
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required"),
              url: Yup.string().required("Required")
            })}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors
            }) => (
              <form onSubmit={handleSubmit} onBlur={handleBlur}>
                {errors && errors["*"] && (
                  <div style={{ paddingBottom: 8 }}>
                    <Typography color="error" variant="body2" component="p">
                      {errors["*"]}
                    </Typography>
                  </div>
                )}

                <TextField
                  autoFocus
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors && errors.name && touched.name ? true : false}
                  helperText={errors && touched.name && errors.name}
                  disabled={isSubmitting}
                  className={classes.formField}
                />
                <TextField
                  label="Base URL"
                  variant="outlined"
                  name="url"
                  fullWidth
                  value={values.url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={errors && errors.url && touched.url ? true : false}
                  helperText={errors && touched.url && errors.url}
                  disabled={isSubmitting}
                  className={classes.formField}
                />
                <PrimaryButton
                  type="submit"
                  onClick={handleSubmit}
                  className={classes.button}
                >
                  {isSubmitting ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : (
                    "Submit"
                  )}
                </PrimaryButton>
                <SecondaryButton
                  className={classes.button}
                  component={ReactRouterLink}
                  to="/namespaces"
                >
                  Cancel
                </SecondaryButton>
                <Backdrop className={classes.backdrop} open={isSubmitting}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </form>
            )}
          </Formik>
        </Paper>
      </div>
    </div>
  );
};

export default CreateNamespace;
