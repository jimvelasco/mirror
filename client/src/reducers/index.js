import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import thumbnailReducer from "./thumbnailReducer";
import mimeReducer from "./mimeReducer";
import statusReducer from "./statusReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  thumbnailreducer: thumbnailReducer,
  mimereducer: mimeReducer,
  statusReducer: statusReducer
});
