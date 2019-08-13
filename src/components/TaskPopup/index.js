import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { openPopup, closePopup } from "../../store/actions/popupActions";
import {
  addTask,
  removeTask,
  completeTask,
  saveChangedTask
} from "../../store/actions/taskAtions";
import Button from "../Button";
import {
  PopupWrapper,
  Popup,
  Title,
  TaskArea,
  Label,
  Deadline,
  BottomBlocksWrapper,
  BottomBlock,
  Paragraph
} from "./styled";

class TaskPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskText: "",
      deadLine: this.getDeadLineDate()
    };
  }

  templatePopup = popupBody => {
    return (
      <PopupWrapper>
        <Popup>{popupBody}</Popup>
      </PopupWrapper>
    );
  };

  getDeadLineDate = () => {
    const now = new Date();
    const deadLine = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 4
    );

    return deadLine.toISOString().split("T")[0];
  };

  getTask = id => {
    const { tasksList } = this.props;

    return tasksList.filter(el => !!el[id]);
  };

  getTaskStatus = (isActual, isCompleted) => {
    if (isActual && isCompleted) {
      return { status: "comleted", title: "Задача выполнена" };
    }
    if (isActual) {
      return { status: "actual", title: "Задача актуальна" };
    }

    return { status: "notActual", title: "Задача провалена" };
  };

  onChangeTextAreaHandler = e => {
    this.setState({
      taskText: e.target.value
    });
  };

  onChangeDeadLine = e => {
    const val = e.target.value;
    const valInDate = new Date(val);
    const now = new Date();

    if (!val || valInDate < now) {
      this.setState({
        deadLine: now.toISOString().split("T")[0]
      });

      return;
    }

    this.setState({
      deadLine: valInDate.toISOString().split("T")[0]
    });
  };

  isSaveButtonActive = () =>
    this.state.taskText && this.state.deadLine ? true : false;

  buildCreatePopup = (changedTask = null) => {
    const { addTask, closePopup, saveChangedTask } = this.props;
    const { taskText, deadLine } = this.state;
    const task = changedTask && changedTask[0];

    return (
      <>
        <Title>{task ? "Задача будет изменена" : "Создайте задачу"}</Title>
        <TaskArea
          onChange={this.onChangeTextAreaHandler}
          defaultValue={task ? task[Object.keys(task)].taskText : taskText}
          placeholder="Что надо сделать?"
        />
        <BottomBlocksWrapper>
          <BottomBlock>
            <Label>
              Дедлайн
              <Deadline
                type="date"
                value={deadLine}
                onChange={this.onChangeDeadLine}
              />
            </Label>
          </BottomBlock>
          <BottomBlock right>
            <Button
              location="popup"
              title="Сохранить"
              forwardedData={
                task
                  ? { ...this.state, taskId: Object.keys(task)[0] }
                  : this.state
              }
              active={this.isSaveButtonActive()}
              clickAction={task ? saveChangedTask : addTask}
            />
            <Button location="popup" title="Закрыть" clickAction={closePopup} />
          </BottomBlock>
        </BottomBlocksWrapper>
      </>
    );
  };

  buildViewPopup = task => {
    const { closePopup, removeTask, completeTask, changeTask } = this.props;
    const taskId = Object.keys(task[0])[0];
    const { create, taskText, deadLine, actual, completed } = task[0][taskId];
    const taskStatus = this.getTaskStatus(actual, completed);

    return (
      <>
        <Title>{taskStatus.title}</Title>
        <TaskArea readOnly value={taskText} />
        <BottomBlocksWrapper view>
          <BottomBlock>
            <Paragraph>
              Дата создания:
              <br />
              {create}
            </Paragraph>
            <Paragraph>
              Дедлайн:
              <br />
              {deadLine}
            </Paragraph>
          </BottomBlock>
          <BottomBlock right>
            {taskStatus.status === "actual" && (
              <>
                <Button
                  location="popup"
                  title="Изменить"
                  forwardedData={{ type: `change__${taskId}` }}
                  clickAction={changeTask}
                />
                <Button
                  location="popup"
                  title="Выполнить"
                  forwardedData={{ taskId }}
                  clickAction={completeTask}
                />
              </>
            )}
            <Button location="popup" title="Закрыть" clickAction={closePopup} />
            <Button
              location="popup"
              title="Удалить"
              forwardedData={{ taskId }}
              clickAction={removeTask}
            />
          </BottomBlock>
        </BottomBlocksWrapper>
      </>
    );
  };

  getPopup = type => {
    if (type === "create") {
      return this.templatePopup(this.buildCreatePopup());
    }

    let popupTypeWithId = type.split("__");
    let popupBody;

    if (popupTypeWithId[0] === "view") {
      popupBody = this.buildViewPopup(
        this.getTask(popupTypeWithId.slice(1).join("__"))
      );
    }

    if (popupTypeWithId[0] === "change") {
      popupBody = this.buildCreatePopup(
        this.getTask(popupTypeWithId.slice(1).join("__"))
      );
    }

    return this.templatePopup(popupBody);
  };

  render() {
    const { popupType } = this.props;
    const popupBlock = document.getElementById("popup");

    return ReactDOM.createPortal(this.getPopup(popupType), popupBlock);
  }
}

TaskPopup.propTypes = {
  popupType: PropTypes.string,
  tasksList: PropTypes.arrayOf(PropTypes.object),
  closePopup: PropTypes.func,
  addTask: PropTypes.func,
  removeTask: PropTypes.func,
  completeTask: PropTypes.func,
  changeTask: PropTypes.func,
  saveChangedTask: PropTypes.func
};

const mapStateToProps = store => {
  return {
    popupType: store.popupReducer.popupType,
    tasksList: store.taskReducer.tasksList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopup: () => dispatch(closePopup()),
    addTask: info => {
      dispatch(addTask(info));
      dispatch(closePopup());
    },
    removeTask: info => {
      dispatch(removeTask(info));
      dispatch(closePopup());
    },
    completeTask: info => {
      dispatch(completeTask(info));
      dispatch(closePopup());
    },
    changeTask: info => {
      dispatch(closePopup());
      dispatch(openPopup(info));
    },
    saveChangedTask: info => {
      dispatch(saveChangedTask(info));
      dispatch(closePopup());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPopup);
