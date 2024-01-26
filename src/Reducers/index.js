import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { leaveReducer } from "./leaveReducer";

export default combineReducers({
  auth: authReducer,
  leave: leaveReducer,
});
