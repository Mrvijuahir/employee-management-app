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
import { START_LOGIN_USER } from "../Actions/AuthAction";
import { connect } from "react-redux";

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

const Login = (props) => {
  const { LoginAction, loginDetail, userDetail } = props;
  const classes = useStyle();

  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup
      .string("Must be string")
      .required("Email is required field.")
      .email("Email must be valid."),
    password: yup
      .string("Must be string")
      .required("Password is required field.")
      .min(8, "Password length should be atleast 8 characters."),
  });

  const handleLogin = async (formValue) => {
    let payload = {
      email: formValue?.email || "",
      password: formValue?.password || "",
    };
    LoginAction(payload);
  };

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleLogin,
      enableReinitialize: true,
    });

  return (
    <Grid className={classes.loginRoot}>
      <Paper primary elevation={0}>
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
            disabled={loginDetail?.isLoading}
            type="submit"
            variant="contained"
            startIcon={
              loginDetail?.isLoading && <CircularProgress size={"20px"} />
            }
          >
            Login
          </Button>
        </form>
        <Grid className={classes.loginFooter}>
          Not a user?{" "}
          <Link onClick={() => navigate("/register")}>Register</Link>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  loginDetail: state.auth.loginDetail,
  userDetail: state.auth.userDetail,
});
const mapDispatchToProps = (dispatch) => ({
  LoginAction: (payload) => dispatch({ type: START_LOGIN_USER, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
