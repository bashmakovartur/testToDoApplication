import React from "react";
import PropTypes from "prop-types";
import { Btn } from "./styled";

const Button = props => {
  const { location, title, clickAction, forwardedData, active } = props;

  const onBtnClick = () => {
    forwardedData ? clickAction(forwardedData) : clickAction();
  };

  return (
    <Btn location={location} onClick={onBtnClick} active={active}>
      {title}
    </Btn>
  );
};

Button.propTypes = {
  location: PropTypes.string,
  title: PropTypes.string,
  clickAction: PropTypes.func,
  active: PropTypes.bool,
  forwardedData: PropTypes.object
};

Button.defaultProps = {
  active: true
};

export default Button;
