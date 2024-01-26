import { all } from "redux-saga/effects";
import { AuthWatcher } from "./authSaga";
import { LeaveWatcher } from "./leaveSaga";

export default function* RootSaga() {
  yield all([AuthWatcher(), LeaveWatcher()]);
}
