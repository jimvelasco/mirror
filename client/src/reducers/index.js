import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import thumbnailReducer from "./thumbnailReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  thumbnailreducer: thumbnailReducer
});
