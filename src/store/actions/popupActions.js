import { OPEN_POPUP, CLOSE_POPUP } from "../constants";

export const openPopup = type => {
  return {
    type: OPEN_POPUP,
    payload: type
  };
};

export const closePopup = () => {
  return {
    type: CLOSE_POPUP,
    payload: null
  };
};
