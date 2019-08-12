import { ADD_TASK, REMOVE_TASK, REMOVE_ALL_TASKS } from "../constants";
import nanoid from "nanoid";

const getTasks = () => {
  const storage = window.localStorage;
  let tasksList = [];

  for (const item in storage) {
    if (item.split("_")[0] === "testToDoTask") {
      let task = JSON.parse(storage[item]);
      let today = new Date();
      const taskDeadLine = new Date(task.deadLine);

      taskDeadLine.setHours(23);
      taskDeadLine.setMinutes(59);
      taskDeadLine.setSeconds(59);

      if (today > taskDeadLine) {
        task.actual = false;
      }

      tasksList.push({ [item]: task });
    }
  }

  return { tasksList };
};

const createTask = task => {
  const now = new Date();
  task.actual = true;
  task.completed = false;

  return { create: now.toISOString().split("T")[0], ...task };
};

const getID = indexLength => nanoid(indexLength);

const addToLocalStorage = (title, info) => {
  localStorage.setItem(title, JSON.stringify(info));
};

const removeAllFromStorage = () => {
  localStorage.clear();
};

const initialState = getTasks();

const taskOptions = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const taskTitle = `testToDoTask_${getID(5)}`;
      const taskInfo = createTask(action.payload);
      const taskList = state.tasksList.slice(0);
      taskList.push({
        [taskTitle]: taskInfo
      });

      addToLocalStorage(taskTitle, taskInfo);

      return {
        tasksList: taskList
      };
    case REMOVE_ALL_TASKS:
      removeAllFromStorage();

      return {
        tasksList: []
      };
    case REMOVE_TASK:
      // debugger;

      return {};
    default:
      return state;
  }
};

export default taskOptions;
