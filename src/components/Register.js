import React from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { START_REGISTER_USER } from "../Actions/AuthAction";

const useStyle = makeStyles(() => ({
  loginRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    "&>div": {
      padding: "20px",
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      "&>p": {
        textAlign: "center",
        marginBottom: "20px",
      },
    },
    "& button": {
      display: "flex",
      margin: "auto",
      marginTop: "10px",
    },
  },
  loginFooter: {
    marginTop: "20px",
    "& a": {
      cursor: "pointer",
    },
  },
}));

const Register = (props) => {
  const { registerAction, registerDetail } = props;
  const classes = useStyle();

  const navigate = useNavigate();

  const registerSchema = yup.object().shape({
    name: yup.string("Must be string").required("Email is required field."),
    email: yup
      .string("Must be string")
      .required("Email is required field.")
      .email("Email must be valid."),
    password: yup
      .string("Must be string")
      .required("Password is required field.")
      .min(8, "Password length should be atleast 8 characters."),
  });

  const handleRegister = async (formValue) => {
    let payload = {
      name: formValue?.name || "",
      email: formValue?.email || "",
      password: formValue?.password || "",
    };
    registerAction(payload);
  };

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit: handleRegister,
      enableReinitialize: true,
    });

  return (
    <Grid className={classes.loginRoot}>
      <Paper primary elevation={0}>
        <h2>Register</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            size="small"
            type="text"
            placeholder="Name"
            label="Name"
            name="name"
            value={values.name || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            error={touched.name && errors.name}
            helperText={touched.name && errors.name}
          ></TextField>{" "}
          <TextField
            fullWidth
            size="small"
            margin="normal"
            name="email"
            placeholder="email"
            label="email"
            value={values.email || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
          ></TextField>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            name="password"
            type="password"
            placeholder="password"
            label="password"
            value={values.password || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
          ></TextField>
          <Button
            disabled={registerDetail?.isLoading}
            type="submit"
            variant="contained"
            startIcon={
              registerDetail?.isLoading && <CircularProgress size={"20px"} />
            }
          >
            Register
          </Button>
        </form>
        <Grid className={classes.loginFooter}>
          Already a user? <Link onClick={() => navigate("/login")}>Login</Link>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  registerDetail: state.auth.registerDetail,
});
const mapDispatchToProps = (dispatch) => ({
  registerAction: (payload) => dispatch({ type: START_REGISTER_USER, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
