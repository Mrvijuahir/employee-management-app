import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_NEW_NOTIFICATION,
  ERROR_GET_DASHBOARD,
  ERROR_GET_USER,
  ERROR_LOGIN_USER,
  ERROR_REGISTER_USER,
  START_GET_DASHBOARD,
  START_GET_USER,
  START_LOGIN_USER,
  START_REGISTER_USER,
  SUCCESS_GET_DASHBOARD,
  SUCCESS_GET_USER,
  SUCCESS_LOGIN_USER,
  SUCCESS_REGISTER_USER,
} from "../Actions/AuthAction";
import {
  getDashboardData,
  getUserDetail,
  loginUserAPI,
  registerUserAPI,
} from "../API/authApi";
import API from "../service";

function* registerUSerWorker({ payload }) {
  try {
    const res = yield call(registerUserAPI, payload);
    if (res.status) {
      yield put({
        type: SUCCESS_REGISTER_USER,
        payload: res,
      });
      API.setAccessTokenInLocalStorage(res?.data?.token);
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "success",
        },
      });
      const res1 = yield call(getUserDetail);
      yield put({
        type: SUCCESS_GET_USER,
        payload: res1,
      });
    } else {
      yield put({
        type: ERROR_REGISTER_USER,
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

function* loginUSerWorker({ payload }) {
  try {
    const res = yield call(loginUserAPI, payload);
    if (res.status) {
      yield put({
        type: SUCCESS_LOGIN_USER,
        payload: res,
      });
      API.setAccessTokenInLocalStorage(res?.data?.token);
      yield put({
        type: ADD_NEW_NOTIFICATION,
        payload: {
          message: res?.message || "Something went wrong!",
          type: "success",
        },
      });
      const res1 = yield call(getUserDetail);
      yield put({
        type: SUCCESS_GET_USER,
        payload: res1,
      });
    } else {
      yield put({
        type: ERROR_LOGIN_USER,
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

function* getUserWorker({ payload }) {
  try {
    const res = yield call(getUserDetail, payload);
    if (res.status) {
      yield put({
        type: SUCCESS_GET_USER,
        payload: res,
      });
    } else {
      yield put({
        type: ERROR_GET_USER,
        payload: res,
      });
    }
  } catch (error) {}
}

function* getDashboardWorker() {
  try {
    const res = yield call(getDashboardData);
    if (res.status) {
      yield put({
        type: SUCCESS_GET_DASHBOARD,
        payload: res,
      });
    } else {
      yield put({
        type: ERROR_GET_DASHBOARD,
        payload: res,
      });
    }
  } catch (error) {}
}

export function* AuthWatcher() {
  yield takeEvery(START_REGISTER_USER, registerUSerWorker);
  yield takeEvery(START_LOGIN_USER, loginUSerWorker);
  yield takeEvery(START_GET_USER, getUserWorker);
  yield takeEvery(START_GET_DASHBOARD, getDashboardWorker);
}
