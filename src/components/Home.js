import React, { useEffect } from "react";
import { Grid, Paper, Typography, Button, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import ContainerWrapper from "./ContainerWrapper";
import { START_GET_DASHBOARD } from "../Actions/AuthAction";

const useStyle = makeStyles(() => ({
  homeRoot: {
    padding: "20px",
  },
  headerRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Home = (props) => {
  const { getDashboard, dashboardData, userDetail } = props;
  const classes = useStyle();

  useEffect(() => {
    getDashboard();
  }, []);

  console.log(dashboardData);

  const isManager = userDetail?.data?.data?.role == "manager";

  let cards = [
    {
      label: isManager ? "Pending to approve" : "Total Leave",
      key: isManager ? "pending" : "total",
    },
    {
      label: isManager ? "Approved Leave" : "Applied Leave",
      key: isManager ? "approved" : "applied",
    },
    {
      label: isManager ? "Declined Leave" : "Available Leave",
      key: isManager ? "declined" : "available",
    },
  ];

  return (
    <>
      <ContainerWrapper>
        <Grid container spacing={2}>
          {dashboardData?.isLoading &&
            cards?.map(() => {
              return (
                <Grid item xs={6} lg={3} sm={6} md={4}>
                  <Skeleton
                    sx={{ transform: "scale(1)", height: "100px" }}
                  ></Skeleton>
                </Grid>
              );
            })}

          {!dashboardData?.isLoading &&
            cards?.map((item) => {
              return (
                <Grid item xs={6} lg={3} sm={6} md={4}>
                  <Paper sx={{ padding: "20px" }} secondary elevation={0}>
                    <Typography>{item?.label}</Typography>
                    <Typography>
                      {dashboardData?.data?.data?.[item?.key]}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </ContainerWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  userDetail: state.auth.userDetail,
  dashboardData: state.auth.dashboardData,
});
const mapDispatchToProps = (dispatch) => ({
  getDashboard: () => dispatch({ type: START_GET_DASHBOARD }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
