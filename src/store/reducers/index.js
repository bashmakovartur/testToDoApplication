import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import popupReducer from "./popupReducer";

export const rootReducer = combineReducers({
  taskReducer,
  popupReducer
});
