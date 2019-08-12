import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closePopup } from "../../store/actions/popupActions";
import { addTask, removeTask } from "../../store/actions/taskAtions";
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
    const { taskList } = this.props;

    return taskList.filter(el => !!el[id]);
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

  buildCreatePopup = () => {
    const { addTask, closePopup } = this.props;

    return (
      <>
        <Title>Создайте задачу</Title>
        <TaskArea
          onChange={this.onChangeTextAreaHandler}
          placeholder="Что надо сделать?"
        />
        <BottomBlocksWrapper>
          <BottomBlock>
            <Label>
              Дедлайн
              <Deadline
                type="date"
                value={this.state.deadLine}
                onChange={this.onChangeDeadLine}
              />
            </Label>
          </BottomBlock>
          <BottomBlock right>
            <Button
              location="popup"
              title="Сохранить"
              forwardedData={this.state}
              active={this.isSaveButtonActive()}
              clickAction={addTask}
            />
            <Button location="popup" title="Закрыть" clickAction={closePopup} />
          </BottomBlock>
        </BottomBlocksWrapper>
      </>
    );
  };

  buildViewPopup = task => {
    const { closePopup, removeTask } = this.props;
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
                  // forwardedData={this.state}
                  // active={this.isSaveButtonActive()}
                  // clickAction={this.props.addTask}
                />
                <Button
                  location="popup"
                  title="Выполнить"
                  // clickAction={this.props.closePopup}
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

  buildEditPopup = task => {
    debugger;
  };

  getPopup = type => {
    if (type === "create") {
      return this.templatePopup(this.buildCreatePopup());
    }

    let popupTypeWithId = type.split("_");

    if (popupTypeWithId[0] === "view") {
      const popupBody = this.buildViewPopup(
        this.getTask(popupTypeWithId.slice(1).join("_"))
      );

      return this.templatePopup(popupBody);
    }

    // switch (type) {
    //   case "create":
    //     return this.templatePopup(this.buildCreatePopup());
    //   case "view":
    //     return this.templatePopup(this.buildViewPopup());
    //   case "edit":
    //     return this.buildEditPopup();
    // }
  };

  render() {
    const { popupType, tasksList } = this.props;
    const popupBlock = document.getElementById("popup");

    return ReactDOM.createPortal(this.getPopup(popupType), popupBlock);
  }
}

TaskPopup.propTypes = {
  popupType: PropTypes.string,
  tasksList: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = store => {
  return {
    popupType: store.popupReducer.popupType,
    taskList: store.taskOptions.tasksList
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPopup);
