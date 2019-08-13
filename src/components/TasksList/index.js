import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { openPopup } from "../../store/actions/popupActions";
import Task from "../Task";

import { Table, TableHeader, TableCell, TableBody, EmptyList } from "./styled";

const TasksList = props => {
  const { tasksList, openPopup } = props;

  return (
    <Table>
      <TableHeader>
        <TableCell main>Заголовок</TableCell>
        <TableCell>Дата создания</TableCell>
        <TableCell>Дедлайн</TableCell>
      </TableHeader>
      <TableBody>
        {tasksList.length ? (
          tasksList.map((el, ind) => (
            <Task key={ind} info={el} openPopup={openPopup} />
          ))
        ) : (
          <EmptyList>Задач нет</EmptyList>
        )}
      </TableBody>
    </Table>
  );
};

TasksList.propTypes = {
  tasksList: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = store => {
  return {
    tasksList: store.taskReducer.tasksList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: type => dispatch(openPopup(type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
