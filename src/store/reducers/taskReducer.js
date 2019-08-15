import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASKS,
  COMPLETE_TASK,
  SAVE_CHANGED_TASK,
  SORT_TASKS,
  DIRECT,
  REVERSE,
  CLOSE_POPUP,
  LOAD_TEST_LIST
} from "../constants";
import nanoid from "nanoid";

const getTasks = () => {
  const storage = window.localStorage;
  const savingSortType = JSON.parse(storage.getItem("sortType"));
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

  return {
    tasksList: tasksList.length
      ? getSortTasks(tasksList, savingSortType || REVERSE)
      : tasksList,
    sortType: REVERSE
  };
};

const createTask = task => {
  const now = new Date();
  task.actual = true;
  task.completed = false;

  return { create: now.toISOString().split("T")[0], ...task };
};

const getSortTasks = (tasks, type) => {
  const sortOrder_a = type === DIRECT ? 1 : -1;
  const sortOrder_b = type === DIRECT ? -1 : 1;

  return tasks.sort((a, b) =>
    a[Object.keys(a)].taskText.toLowerCase() >
    b[Object.keys(b)].taskText.toLowerCase()
      ? sortOrder_a
      : sortOrder_b
  );
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
      const tasksList = [...state.tasksList];
      tasksList.push({
        [taskTitle]: taskInfo
      });

      addToLocalStorage(taskTitle, taskInfo);

      return {
        tasksList,
        sortType: state.sortType
      };
    }
    case REMOVE_ALL_TASKS:
      removeAllFromLocalStorage();

      return {
        tasksList: [],
        sortType: state.sortType
      };
    case REMOVE_TASK: {
      const { taskId } = action.payload;
      const tasksList = [...state.tasksList];
      const removedTaskIndex = tasksList.findIndex(el => !!el[taskId]);

      tasksList.splice(removedTaskIndex, 1);
      removeFromLocalStorage(taskId);

      return {
        tasksList,
        sortType: state.sortType
      };
    }
    case COMPLETE_TASK: {
      const { taskId } = action.payload;
      const tasksList = [...state.tasksList];
      const completedTaskIndex = tasksList.findIndex(el => !!el[taskId]);

      tasksList[completedTaskIndex][taskId].completed = true;
      completeTaskInLocalStorage(taskId);

      return {
        tasksList,
        sortType: state.sortType
      };
    }
    case SAVE_CHANGED_TASK: {
      const { taskId, deadLine, taskText } = action.payload;
      const tasksList = [...state.tasksList];
      const changedTaskIndex = tasksList.findIndex(el => !!el[taskId]);
      let task = tasksList[changedTaskIndex][taskId];

      task.deadLine = deadLine;
      task.taskText = taskText;

      replaceTaskInLocalStorage(task, taskId);

      return {
        tasksList,
        sortType: state.sortType
      };
    }
    case SORT_TASKS:
    case CLOSE_POPUP: {
      const { sortType } = state;
      const tasksList = [...state.tasksList];
      let nextSortingType = sortType === DIRECT ? REVERSE : DIRECT;

      if (action.type === CLOSE_POPUP) {
        nextSortingType = sortType;
      }

      addToLocalStorage("sortType", nextSortingType);

      return {
        tasksList: getSortTasks(tasksList, nextSortingType),
        sortType: nextSortingType
      };
    }
    case LOAD_TEST_LIST: {
      const testList = [];
      const arrForObjKeys = Array(10).fill("");
      const getRandomBoolean = () => Math.random() >= 0.5;
      const id = arrForObjKeys.map(() => `testToDoTask__${getID(5)}`);
      const titles = arrForObjKeys.map((el, ind) => `Тестовая задача № ${ind}`);
      const actual = arrForObjKeys.map(() => getRandomBoolean());
      const completed = arrForObjKeys.map(() => getRandomBoolean());
      const create = [
        "2019-07-10",
        "2019-07-19",
        "2019-07-12",
        "2019-07-15",
        "2019-07-05",
        "2019-08-11",
        "2019-07-10",
        "2019-08-12",
        "2019-08-09",
        "2019-08-02"
      ];
      const deadLine = [
        "2019-07-12",
        "2019-07-29",
        "2019-09-12",
        "2019-08-15",
        "2019-07-07",
        "2019-08-13",
        "2019-07-11",
        "2019-08-22",
        "2019-08-28",
        "2019-09-29"
      ];

      arrForObjKeys.forEach((el, ind) => {
        testList.push({
          [id[ind]]: {
            taskText: titles[ind],
            create: create[ind],
            deadLine: deadLine[ind],
            actual: actual[ind],
            completed: completed[ind]
          }
        });
      });

      testList.forEach(el => {
        addToLocalStorage(Object.keys(el)[0], el[Object.keys(el)[0]]);
      });

      return getTasks();
    }
    default:
      return state;
  }
};

export default taskReducer;
