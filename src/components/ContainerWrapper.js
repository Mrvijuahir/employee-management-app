import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  wrapperRoot: {
    margin: "20px 50px",
    "& .header": {
      padding: "20px",

      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "&>p": {
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
  },
  wrapperBody: {
    display: "flex",
    marginTop: "20px",
    "& .left": {
      padding: "20px",
      "&>button": {
        marginTop: "auto ",
        width: "100%",
      },
      marginRight: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start !important",
      minWidth: "200px",
      minHeight: "calc(100vh - 200px)",
      "&>li": {
        width: "100%",
        marginBottom: "10px",
        borderRadius: "10px",
      },
      "& .active": {
        backgroundColor: `${theme.palette.secondary.main}20 !important`,
      },
    },
  },
}));

const ContainerWrapper = (props) => {
  const { children, userDetail } = props;

  const classes = useStyle();

  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    {
      label: "Dashboard",
      url: "dashboard",
    },
    {
      label: "Leaves",
      url: "leave",
    },
  ];

  return (
    <>
      <Grid className={classes.wrapperRoot}>
        <Paper className="header" elevation={0} primary>
          <Typography>Leave Management System</Typography>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              "& .MuiAvatar-root": { marginLeft: "20px" },
            }}
          >
            <Grid
              sx={{
                "&>p": {
                  textAlign: "right",
                  "&:first-child": { fontWeight: "bold", fontSize: "18px" },
                },
              }}
            >
              <Typography>{userDetail?.data?.data?.name}</Typography>
              <Typography>{userDetail?.data?.data?.role}</Typography>
            </Grid>
            <Avatar></Avatar>
          </Grid>
        </Paper>
        <Grid className={classes.wrapperBody}>
          <Paper className="left" elevation={0} primary>
            {menus?.map((item, i) => {
              return (
                <MenuItem
                  className={
                    location.pathname.includes(item?.url) ? "active" : ""
                  }
                  key={i}
                  onClick={() => navigate(`/${item?.url}`)}
                >
                  {item?.label}
                </MenuItem>
              );
            })}
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              variant="outlined"
            >
              Logout
            </Button>
          </Paper>
          <Grid sx={{ width: "100%" }}>{children}</Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  userDetail: state.auth.userDetail,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerWrapper);
