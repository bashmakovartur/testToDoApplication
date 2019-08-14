import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASKS,
  COMPLETE_TASK,
  SAVE_CHANGED_TASK,
  SORT_TASKS,
  LOAD_TEST_LIST
} from "../constants";

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

export const completeTask = info => {
  return {
    type: COMPLETE_TASK,
    payload: info
  };
};

export const saveChangedTask = info => {
  return {
    type: SAVE_CHANGED_TASK,
    payload: info
  };
};

export const sortTasks = () => {
  return {
    type: SORT_TASKS,
    payload: ""
  };
};

export const loadTestList = () => {
  return {
    type: LOAD_TEST_LIST,
    payload: ""
  };
};
