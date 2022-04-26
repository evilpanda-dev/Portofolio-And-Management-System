const defaultState = {
  popup: false,
};

const REGISTER_CLICKED = "REGISTER_CLICKED";
const REGISTER_CLOSED = "REGISTER_CLOSED";

export const registerButtonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REGISTER_CLICKED:
      return { ...state, popup: action.payload };
    case REGISTER_CLOSED:
      return { ...state, popup: action.payload };
    default:
      return state;
  }
};
