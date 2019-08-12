import { OPEN_POPUP, CLOSE_POPUP } from "../constants";

export const openPopup = data => {
  return {
    type: OPEN_POPUP,
    payload: data.type
  };
};

export const closePopup = () => {
  return {
    type: CLOSE_POPUP,
    payload: null
  };
};
