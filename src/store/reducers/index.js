import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import taskSort from "./tasksSort";
import popupReducer from "./popupReducer";

export const rootReducer = combineReducers({
  taskReducer,
  taskSort,
  popupReducer
});
