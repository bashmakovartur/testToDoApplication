import React from "react";
import PropTypes from "prop-types";
import { TaskRow, TaskCell } from "./styles";

const Task = props => {
  const taskId = Object.keys(props.info)[0];
  const { create, taskText, deadLine, actual, completed } = props.info[taskId];
  const { openPopup } = props;
  const rowOnClickHandler = () => {
    openPopup({ type: `view__${taskId}` });
  };

  return (
    <TaskRow actual={actual} completed={completed} onClick={rowOnClickHandler}>
      <TaskCell main>{taskText}</TaskCell>
      <TaskCell>{create}</TaskCell>
      <TaskCell>{deadLine}</TaskCell>
    </TaskRow>
  );
};

Task.propTypes = {
  info: PropTypes.object,
  openPopup: PropTypes.func
};

export default Task;
