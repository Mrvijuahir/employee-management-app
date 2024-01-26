import React from "react";
import { Alert, Grid, Snackbar, Button } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADD_NEW_NOTIFICATION,
  CLOSE_NOTIFICATION,
} from "../Actions/AuthAction";

export const useNotification = () => {
  const dispatch = useDispatch();
  const generateNotification = (type, other = {}) => {
    let payload = {};
    if (typeof other === "string") {
      payload.message = other;
    } else {
      payload = other;
    }
    if (payload.message) {
      dispatch({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          type: type,
          ...payload,
        },
      });
    }
  };
  const success = (other) => generateNotification("success", other);
  const info = (other) => generateNotification("info", other);
  const warning = (other) => generateNotification("warning", other);
  const error = (other) => generateNotification("error", other);
  return { success, info, warning, error };
};

const NotificationManager = (props) => {
  const { notificationDetail, closeNotificationAction } = props;
  const navigate = useNavigate();

  const handleCloseAlert = (id) => (e) => {
    let isAlreadyClosed = false;
    let data = notificationDetail?.notifications.map((item) => {
      if (item.id === id && !item.open) {
        isAlreadyClosed = true;
      }
    });

    if (!isAlreadyClosed) {
      closeNotificationAction(id);
    }
  };

  const handleNavigate = (item) => {
    navigate(item?.url);
    handleCloseAlert(item.id);
  };

  return (
    <Grid>
      {notificationDetail?.notifications.map(
        (item, i) =>
          item?.message && (
            <Snackbar
              key={i}
              open={item.open}
              autoHideDuration={item.duration}
              onClose={handleCloseAlert(item.id)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleCloseAlert(item.id)}
                style={{ cursor: item?.url ? "pointer" : "initial" }}
                onClick={() => item?.url && handleNavigate(item)}
                severity={item?.type}
              >
                {item.message}
              </Alert>
            </Snackbar>
          )
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  notificationDetail: state.auth.notificationDetail,
});

const mapDispatchToProps = (dispatch) => ({
  closeNotificationAction: (id) =>
    dispatch({
      type: CLOSE_NOTIFICATION,
      id,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationManager);
