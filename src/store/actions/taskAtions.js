import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASKS,
  COMPLETE_TASK,
  CHANGE_TASK,
  SAVE_CHANGED_TASK
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

// export const changeTask = () => {
//   return {
//     type: CHANGE_TASK,
//     payload: ""
//   };
// };

export const saveChangedTask = info => {
  return {
    type: SAVE_CHANGED_TASK,
    payload: info
  };
};
