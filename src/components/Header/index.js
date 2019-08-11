import React, { Component } from "react";
import { connect } from "react-redux";
import TaskPopup from "../TaskPopup";
import Button from "../Button";
import { openPopup } from "../../store/actions/popupActions";
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

  render() {
    const { popupState, popupType, openPopup } = this.props;

    return (
      <HeaderBlock>
        <Title>Список задач</Title>
        <TasksInfo>
          <Paragraph>Всего: 20</Paragraph>
          <Paragraph>Актуальных: 15</Paragraph>
          <Paragraph>Выполнено: 5</Paragraph>
        </TasksInfo>
        <ButtonsBlock>
          <Button
            location="header"
            title="Создать"
            type="create"
            clickAction={openPopup}
          />
          <Button location="header" title="Удалить все" />
          <Button location="header" title="Сортировать" />
        </ButtonsBlock>
        {popupState && <TaskPopup type={popupType} />}
      </HeaderBlock>
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    popupState: store.popupReducer.isPopupOpen,
    popupType: store.popupReducer.popupType
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
)(Header);
