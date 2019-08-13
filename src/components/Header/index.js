import React, { Component } from "react";
import { connect } from "react-redux";
import TaskPopup from "../TaskPopup";
import Button from "../Button";
import { openPopup } from "../../store/actions/popupActions";
import { removeAllTasks } from "../../store/actions/taskAtions";
import {
  HeaderBlock,
  Title,
  TasksInfo,
  Paragraph,
  ButtonsBlock
} from "./styled";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  getTasksAmount = tasksList => {
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

  render() {
    const { popupState, openPopup, tasksList, removeAllTasks } = this.props;
    const { actualTasks, notActualTasks, completedTasks } = this.getTasksAmount(
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
            active={tasksList.length > 1}
          />
        </ButtonsBlock>
        {popupState && <TaskPopup />}
      </HeaderBlock>
    );
  }
}

const mapStateToProps = store => {
  return {
    popupState: store.popupReducer.isPopupOpen,
    tasksList: store.taskReducer.tasksList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openPopup: type => dispatch(openPopup(type)),
    removeAllTasks: () => dispatch(removeAllTasks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
