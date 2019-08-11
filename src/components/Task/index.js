import React, { Component } from "react";
import { TaskRow, TaskCell } from "./styles";

const Task = props => {
  return (
    <TaskRow>
      <TaskCell main>{props.children}</TaskCell>
      <TaskCell>{props.children}</TaskCell>
      <TaskCell>{props.children}</TaskCell>
    </TaskRow>
  );
};

export default Task;
