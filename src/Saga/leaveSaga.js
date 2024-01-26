import { call, put, take, takeEvery } from "redux-saga/effects";
import API from "../service";
import {
  ERROR_ADD_LEAVE,
  ERROR_DELETE_LEAVE,
  ERROR_EDIT_LEAVE,
  ERROR_GET_LEAVES,
  ERROR_LEAVE_ACTON,
  START_ADD_LEAVE,
  START_DELETE_LEAVE,
  START_EDIT_LEAVE,
  START_GET_LEAVES,
  START_LEAVE_ACTON,
  SUCCESS_ADD_LEAVE,
  SUCCESS_DELETE_LEAVE,
  SUCCESS_EDIT_LEAVE,
  SUCCESS_GET_LEAVES,
  SUCCESS_LEAVE_ACTON,
} from "../Actions/LeaveAction";
import {
  addLEaveApi,
  deleteLeaveAction,
  editLeaveAPi,
  getLeavesApi,
  takeLeaveAction,
} from "../API/leaveApi";
import { ADD_NEW_NOTIFICATION } from "../Actions/AuthAction";

function* getLeavesWorker() {
  try {
    const res = yield call(getLeavesApi);
    if (res.status) {
      yield put({
        type: SUCCESS_GET_LEAVES,
        payload: res,
      });
    } else {
      yield put({
        type: ERROR_GET_LEAVES,
        payload: res,
      });
    }
  } catch (error) {}
}

function* addLeaveWorker({ payload }) {
  try {
    const res = yield call(addLEaveApi, payload);
    if (res.status) {
      yield put({
        type: SUCCESS_ADD_LEAVE,
        payload: res,
      });
      const res1 = yield call(getLeavesApi);
      yield put({
        type: SUCCESS_GET_LEAVES,
        payload: res1,
      });
    } else {
      yield put({
        type: ERROR_ADD_LEAVE,
        payload: res,
      });
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "error",
        },
      });
    }
  } catch (error) {}
}

function* leaveActionWorker({ id, payload }) {
  try {
    const res = yield call(takeLeaveAction, id, payload);
    if (res.status) {
      yield put({
        type: SUCCESS_LEAVE_ACTON,
        payload: res,
      });
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "success",
        },
      });
      const res1 = yield call(getLeavesApi);
      yield put({
        type: SUCCESS_GET_LEAVES,
        payload: res1,
      });
    } else {
      yield put({
        type: ERROR_LEAVE_ACTON,
        payload: res,
      });
    }
  } catch (error) {}
}

function* deleteLeaveWorker({ id }) {
  try {
    const res = yield call(deleteLeaveAction, id);
    if (res.status) {
      yield put({
        type: SUCCESS_DELETE_LEAVE,
        payload: res,
      });
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "success",
        },
      });
      const res1 = yield call(getLeavesApi);
      yield put({
        type: SUCCESS_GET_LEAVES,
        payload: res1,
      });
    } else {
      yield put({
        type: ERROR_DELETE_LEAVE,
        payload: res,
      });
    }
  } catch (error) {}
}

function* editLeaveWorker({ id, payload }) {
  try {
    const res = yield call(editLeaveAPi, id, payload);
    if (res.status) {
      yield put({
        type: SUCCESS_EDIT_LEAVE,
        payload: res,
      });
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "success",
        },
      });
      const res1 = yield call(getLeavesApi);
      yield put({
        type: SUCCESS_GET_LEAVES,
        payload: res1,
      });
    } else {
      yield put({
        type: ERROR_EDIT_LEAVE,
        payload: res,
      });
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "error",
        },
      });
    }
  } catch (error) {}
}

export function* LeaveWatcher() {
  yield takeEvery(START_GET_LEAVES, getLeavesWorker);
  yield takeEvery(START_ADD_LEAVE, addLeaveWorker);
  yield takeEvery(START_LEAVE_ACTON, leaveActionWorker);
  yield takeEvery(START_DELETE_LEAVE, deleteLeaveWorker);
  yield takeEvery(START_EDIT_LEAVE, editLeaveWorker);
}
