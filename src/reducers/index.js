import { combineReducers } from "redux";
import authReducer from "./authReducer";
import toastReducer from "./toastReducer";
import homeReducer from "./homeReducer";

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
  toasts: toastReducer
});
