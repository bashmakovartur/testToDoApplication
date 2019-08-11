import { createStore } from "redux";
import { rootReducer } from "./reducers";

const getTasks = () => {
  return {};
};

const initialState = getTasks();

export const store = createStore(rootReducer, initialState);
