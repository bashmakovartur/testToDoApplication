import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASKS,
  COMPLETE_TASK,
  SAVE_CHANGED_TASK
} from "../constants";
import nanoid from "nanoid";

const getTasks = () => {
  const storage = window.localStorage;
  let tasksList = [];

  for (const item in storage) {
    if (item.split("__")[0] === "testToDoTask") {
      let task = JSON.parse(storage[item]);
      let today = new Date();
      const taskDeadLine = new Date(task.deadLine);

      taskDeadLine.setHours(23);
      taskDeadLine.setMinutes(59);
      taskDeadLine.setSeconds(59);

      if (today > taskDeadLine && !task.completed) {
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

const removeFromLocalStorage = id => {
  localStorage.removeItem(id);
};

const removeAllFromLocalStorage = () => {
  localStorage.clear();
};

const completeTaskInLocalStorage = taskId => {
  let task = JSON.parse(localStorage.getItem(taskId));
  task.completed = true;

  removeFromLocalStorage(taskId);
  addToLocalStorage(taskId, task);
};

const replaceTaskInLocalStorage = (task, taskId) => {
  removeFromLocalStorage(taskId);
  addToLocalStorage(taskId, task);
};

const initialState = getTasks();

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const taskTitle = `testToDoTask__${getID(5)}`;
      const taskInfo = createTask(action.payload);
      const tasksList = state.tasksList.slice(0);
      tasksList.push({
        [taskTitle]: taskInfo
      });

      addToLocalStorage(taskTitle, taskInfo);

      return {
        tasksList
      };
    }
    case REMOVE_ALL_TASKS:
      removeAllFromLocalStorage();

      return {
        tasksList: []
      };
    case REMOVE_TASK: {
      const { taskId } = action.payload;
      let tasksList = state.tasksList.slice(0);
      const removedTaskIndex = tasksList.findIndex((el, ind) => !!el[taskId]);

      tasksList.splice(removedTaskIndex, 1);
      removeFromLocalStorage(taskId);

      return {
        tasksList
      };
    }
    case COMPLETE_TASK: {
      const { taskId } = action.payload;
      let tasksList = state.tasksList.slice(0);
      const completedTaskIndex = tasksList.findIndex((el, ind) => !!el[taskId]);

      tasksList[completedTaskIndex][taskId].completed = true;
      completeTaskInLocalStorage(taskId);

      return {
        tasksList
      };
    }
    case SAVE_CHANGED_TASK: {
      const { taskId, deadLine, taskText } = action.payload;
      let tasksList = state.tasksList.slice(0);
      const changedTaskIndex = tasksList.findIndex((el, ind) => !!el[taskId]);
      let task = tasksList[changedTaskIndex][taskId];

      task.deadLine = deadLine;
      task.taskText = taskText;

      replaceTaskInLocalStorage(task, taskId);

      return {
        tasksList
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
