import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import * as yup from "yup";
import { useFormik } from "formik";
import { START_ADD_LEAVE, START_EDIT_LEAVE } from "../Actions/LeaveAction";

const LeaveDialog = (props) => {
  const {
    open,
    setOpen,
    addLeaveAction,
    addLeaveData,
    editData = {},
    editLeaveAction,
    editLeaveData,
  } = props;

  const [submitted, setSubmitted] = useState(false);
  const [initialData, setInitialData] = useState({
    leave: "",
    reason: "",
    start_date: moment(new Date()),
    end_date: moment(new Date()),
  });

  useEffect(() => {
    if (open && Object.keys(editData || {})?.length) {
      setInitialData({
        leave: editData?.type,
        reason: editData?.reason,
        start_date: moment(editData?.start_date),
        end_date: moment(editData?.end_date),
      });
    }
  }, [open]);

  const loginSchema = yup.object().shape({
    leave: yup
      .string("Must be string")
      .required("Leave Type is required field."),
    reason: yup.string("Must be string"),
    start_date: yup.object().required("Start Date is required"),
    end_date: yup.object().required("End Date is required"),
  });

  const handleSave = (formValue) => {
    setSubmitted(true);
    let payload = {
      type: formValue?.leave,
      reason: formValue?.reason,
      start_date: moment(formValue?.start_date).toLocaleString(),
      end_date: moment(formValue?.end_date).toLocaleString(),
    };

    if (open == "add") {
      addLeaveAction(payload);
    } else {
      editLeaveAction(editData?.id, payload);
    }
  };

  const handleClose = () => {
    setOpen("");
    setInitialData({
      leave: "",
      reason: "",
      start_date: moment(new Date()),
      end_date: moment(new Date()),
    });
  };

  useEffect(() => {
    if (
      (submitted &&
        Object.keys(addLeaveData || {})?.length &&
        !Object.keys(addLeaveData?.error || {})?.length &&
        !addLeaveData?.isLoading) ||
      (Object.keys(editLeaveData || {})?.length &&
        !Object.keys(editLeaveData?.error || {})?.length &&
        !editLeaveData?.isLoading)
    ) {
      setSubmitted(false);
      handleClose();
    }
  }, [addLeaveData, editLeaveData]);

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialData,
    validationSchema: loginSchema,
    onSubmit: handleSave,
    enableReinitialize: true,
  });

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={Boolean(open)}
      onClose={() => handleClose()}
    >
      <DialogTitle>{open == "add" ? "Add Leave" : "Edit Leave"}</DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent>
          <FormControl
            error={touched?.leave && Boolean(errors?.leave)}
            margin="normal"
            size="small"
            fullWidth
          >
            <InputLabel>Leave Type</InputLabel>
            <Select
              onChange={handleChange}
              value={values?.leave}
              name="leave"
              size="small"
              label="Leave Type"
            >
              <MenuItem value={"casual"}>Casual Leave</MenuItem>
              <MenuItem value={"sick"}>Sick Leave</MenuItem>
              <MenuItem value={"emergency"}>Emergency Leave</MenuItem>
            </Select>
            <FormHelperText error={touched?.leave && errors?.leave}>
              {touched?.leave && errors?.leave}
            </FormHelperText>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label={"Start Date"}
              name="start_date"
              views={["year", "month", "day"]}
              value={values?.start_date}
              onChange={(newValue) => setFieldValue("start_date", newValue)}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              minDate={moment()}
              slotProps={{
                textField: {
                  margin: "normal",
                  fullWidth: true,
                  size: "small",
                  error: touched?.start_date && errors?.start_date,
                  helperText: touched?.start_date && errors?.start_date,
                },
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label={"End Date"}
              name="end_date"
              views={["year", "month", "day"]}
              value={values?.end_date}
              onChange={(newValue) => setFieldValue("end_date", newValue)}
              minDate={moment(values?.start_date)}
              slotProps={{
                textField: {
                  margin: "normal",
                  fullWidth: true,
                  size: "small",
                  error: touched?.end_date && errors?.end_date,
                  helperText: touched?.end_date && errors?.end_date,
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            label="Reason"
            margin="normal"
            fullWidth
            size="small"
            placeholder="reason"
            name="reason"
            value={values?.reason}
            onChange={handleChange}
            error={touched.reason && errors.reason}
            helperText={touched.reason && errors.reason}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            disabled={addLeaveData?.isLoading || editLeaveData?.isLoading}
            startIcon={
              (addLeaveData?.isLoading || editLeaveData?.isLoading) && (
                <CircularProgress size="20px" />
              )
            }
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  addLeaveData: state.leave.addLeaveData,
  editLeaveData: state.leave.editLeaveData,
});
const mapDispatchToProps = (dispatch) => ({
  addLeaveAction: (payload) => dispatch({ type: START_ADD_LEAVE, payload }),
  editLeaveAction: (id, payload) =>
    dispatch({ type: START_EDIT_LEAVE, id, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaveDialog);
