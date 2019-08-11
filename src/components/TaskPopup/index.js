import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { closePopup } from "../../store/actions/popupActions";
import Button from "../Button";
import {
  PopupWrapper,
  Popup,
  Title,
  TaskArea,
  Label,
  Deadline,
  BottomBlocksWrapper,
  BottomBlock
} from "./styled";

class TaskPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getDeadLineDate = () => {
    const now = new Date();
    const deadLine = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 4
    );

    return deadLine.toISOString().split("T")[0];
  };

  buildCreatePopup = () => {
    return (
      <PopupWrapper>
        <Popup>
          <Title>Создайте задачу</Title>
          <TaskArea placeholder="Что надо сделать?" />
          <BottomBlocksWrapper>
            <BottomBlock>
              <Label>
                Дедлайн
                <Deadline type="date" defaultValue={this.getDeadLineDate()} />
              </Label>
            </BottomBlock>
            <BottomBlock right>
              <Button location="popup" title="Сохранить" />
              <Button
                location="popup"
                title="Закрыть"
                clickAction={this.props.closePopup}
              />
            </BottomBlock>
          </BottomBlocksWrapper>
        </Popup>
      </PopupWrapper>
    );
  };

  buildViewPopup = () => {
    debugger;
  };

  buildEditPopup = () => {
    debugger;
  };

  getPopup = type => {
    switch (type) {
      case "create":
        return this.buildCreatePopup();
      case "view":
        return this.buildViewPopup();
      case "edit":
        return this.buildEditPopup();
    }
  };

  render() {
    const { popupType } = this.props;
    const popupBlock = document.getElementById("popup");

    return ReactDOM.createPortal(this.getPopup(popupType), popupBlock);
  }
}

TaskPopup.propTypes = {
  type: PropTypes.string
};

const mapStateToProps = store => {
  console.log(store);
  return {
    popupType: store.popupReducer.popupType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePopup: () => dispatch(closePopup())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskPopup);
