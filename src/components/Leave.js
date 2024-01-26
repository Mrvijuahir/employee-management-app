import React, { useEffect, useState } from "react";
import ContainerWrapper from "./ContainerWrapper";
import { makeStyles } from "@mui/styles";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { connect } from "react-redux";
import {
  START_DELETE_LEAVE,
  START_GET_LEAVES,
  START_LEAVE_ACTON,
} from "../Actions/LeaveAction";
import LeaveDialog from "./LeaveDialog";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  leaveRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Leave = (props) => {
  const {
    userDetail,
    getLeaveAction,
    leaveData,
    takeLeaveAction,
    deleteLeaveAction,
  } = props;
  const classes = useStyle();

  const isManager = userDetail?.data?.data?.role == "manager";

  const [addLeave, setAddLeave] = useState("");
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getLeaveAction();
  }, []);

  return (
    <>
      <ContainerWrapper>
        <Grid className={classes.leaveRoot}>
          <Typography variant="h6">Leaves</Typography>
          {!isManager ? (
            <Button
              onClick={() => {
                setAddLeave("add");
                setEditData({});
              }}
              variant="contained"
            >
              Add Leave
            </Button>
          ) : (
            ""
          )}
        </Grid>
        {leaveData?.isLoading && (
          <Grid
            sx={{
              minHeight: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size="50px" thickness={5} />
          </Grid>
        )}

        <TableContainer sx={{ marginTop: "20px", maxHeight: 450 }}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {isManager && <TableCell>User</TableCell>}
                <TableCell>Type</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Status </TableCell>
                <TableCell align="right">Reason</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveData?.data?.data?.count ? (
                leaveData?.data?.data?.rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {isManager && (
                      <TableCell component="th" scope="row">
                        {row.User?.name}
                      </TableCell>
                    )}
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.start_date).format("ll")}
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.end_date).format("ll")}
                    </TableCell>
                    <TableCell align="right">
                      {row.approved
                        ? "Approved"
                        : row?.declined
                        ? "Declined"
                        : "Pending"}
                    </TableCell>
                    <TableCell align="right">{row.reason || "-"}</TableCell>
                    {isManager ? (
                      <TableCell align="right">
                        <Button
                          onClick={() =>
                            takeLeaveAction(row?.id, { type: "approve" })
                          }
                          disabled={row?.approved || row?.declined}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            takeLeaveAction(row?.id, { type: "decline" })
                          }
                          disabled={row?.approved || row?.declined}
                        >
                          Decline
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            setAddLeave("edit");
                            setEditData(row);
                          }}
                          disabled={row?.approved || row?.declined}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteLeaveAction(row?.id)}
                          disabled={row?.approved || row?.declined}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell style={{ textAlign: "center" }} colSpan={10}>
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ContainerWrapper>
      <LeaveDialog editData={editData} open={addLeave} setOpen={setAddLeave} />
    </>
  );
};

const mapStateToProps = (state) => ({
  userDetail: state.auth.userDetail,
  leaveData: state.leave.leaveData,
});
const mapDispatchToProps = (dispatch) => ({
  getLeaveAction: () => dispatch({ type: START_GET_LEAVES }),
  takeLeaveAction: (id, payload) =>
    dispatch({ type: START_LEAVE_ACTON, id, payload }),
  deleteLeaveAction: (id) => dispatch({ type: START_DELETE_LEAVE, id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leave);
