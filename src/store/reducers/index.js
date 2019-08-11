import { combineReducers } from "redux";
import taskOptions from "./taskOptions";
import taskSort from "./tasksSort";
import popupReducer from "./popupReducer";

export const rootReducer = combineReducers({
  taskOptions,
  taskSort,
  popupReducer
});
