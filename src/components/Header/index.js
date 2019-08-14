import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TaskPopup from "../TaskPopup";
import Button from "../Button";
import { openPopup } from "../../store/actions/popupActions";
import { removeAllTasks, sortTasks } from "../../store/actions/taskAtions";
import {
  HeaderBlock,
  Title,
  TasksInfo,
  Paragraph,
  ButtonsBlock
} from "./styled";

const Header = props => {
  const { popupState, openPopup, tasksList, removeAllTasks, sortTasks } = props;

  const getTasksAmount = tasksList => {
    let actualTasks = 0;
    let notActualTasks = 0;
    let completedTasks = 0;

    tasksList.forEach(el => {
      const taskId = Object.keys(el)[0];
      if (el[taskId].completed) {
        completedTasks++;

        return;
      }

      el[taskId].actual ? actualTasks++ : notActualTasks++;
    });

    return {
      actualTasks,
      notActualTasks,
      completedTasks
    };
  };

  const { actualTasks, notActualTasks, completedTasks } = getTasksAmount(
    tasksList
  );

  return (
    <HeaderBlock>
      <Title>Список задач</Title>
      <TasksInfo>
        <Paragraph>Всего: {tasksList.length}</Paragraph>
        <Paragraph>Актуальных: {actualTasks}</Paragraph>
        <Paragraph>Просрочено: {notActualTasks}</Paragraph>
        <Paragraph>Выполнено: {completedTasks}</Paragraph>
      </TasksInfo>
      <ButtonsBlock>
        <Button
          location="header"
          title="Создать"
          forwardedData={{ type: "create" }}
          clickAction={openPopup}
        />
        <Button
          location="header"
          title="Удалить все"
          clickAction={removeAllTasks}
          active={tasksList.length > 0}
        />
        <Button
          location="header"
          title="Сортировать"
          clickAction={sortTasks}
          active={tasksList.length > 1}
        />
      </ButtonsBlock>
      {popupState && <TaskPopup />}
    </HeaderBlock>
  );
};

Header.propTypes = {
  popupState: PropTypes.bool,
  tasksList: PropTypes.arrayOf(PropTypes.object),
  openPopup: PropTypes.func,
  openPremoveAllTasksopup: PropTypes.func,
  sortTasks: PropTypes.func
};

const mapStateToProps = store => {
  return {
    popupState: store.popupReducer.isPopupOpen,
    tasksList: store.taskReducer.tasksList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: type => dispatch(openPopup(type)),
    removeAllTasks: () => dispatch(removeAllTasks()),
    sortTasks: () => dispatch(sortTasks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
