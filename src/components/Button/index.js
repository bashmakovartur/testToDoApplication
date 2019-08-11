import React from "react";
import PropTypes from "prop-types";
import { Btn } from "./styled";

const Button = props => {
  const { location, title, clickAction, type } = props;

  const onBtnClick = () => {
    type ? clickAction(type) : clickAction();
  };

  return (
    <Btn location={location} onClick={onBtnClick}>
      {title}
    </Btn>
  );
};

Button.propTypes = {
  location: PropTypes.string,
  title: PropTypes.string,
  clickAction: PropTypes.func,
  type: PropTypes.string
};

export default Button;
