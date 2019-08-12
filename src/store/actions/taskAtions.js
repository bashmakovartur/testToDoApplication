import { ADD_TASK, REMOVE_TASK, REMOVE_ALL_TASKS } from "../constants";

export const addTask = info => {
  return {
    type: ADD_TASK,
    payload: info
  };
};

export const removeAllTasks = () => {
  return {
    type: REMOVE_ALL_TASKS,
    payload: ""
  };
};

export const removeTask = info => {
  return {
    type: REMOVE_TASK,
    payload: info
  };
};
