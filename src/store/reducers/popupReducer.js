import { OPEN_POPUP, CLOSE_POPUP } from "../constants";

const initialState = {
  isPopupOpen: false,
  popupType: null
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return Object.assign({}, state, {
        isPopupOpen: true,
        popupType: action.payload
      });
    case CLOSE_POPUP:
      return Object.assign({}, state, {
        isPopupOpen: false,
        popupType: null
      });
    default:
      return state;
  }
};

export default popupReducer;
