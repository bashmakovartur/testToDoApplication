import React from "react";
import Task from "../Task";

import { Table, TableHeader, TableCell, TableBody, EmptyList } from "./styled";

const TasksList = props => {
  const tasks = [];
  return (
    <Table>
      <TableHeader>
        <TableCell main>Заголовок</TableCell>
        <TableCell>Дата создания</TableCell>
        <TableCell>Дедлайн</TableCell>
      </TableHeader>
      <TableBody>
        {tasks && tasks.length ? (
          tasks.map((el, ind) => <Task key={ind}>Задача {el}</Task>)
        ) : (
          <EmptyList>Задач нет</EmptyList>
        )}
      </TableBody>
    </Table>
  );
};

export default TasksList;
