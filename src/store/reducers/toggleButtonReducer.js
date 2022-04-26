const defaultState = {
  visibility: false,
};

const VISIBILITY_ACTIVATED = "VISIBILITY_ACTIVATED";
const VISIBILITY_DEACTIVATED = "VISIBILITY_DEACTIVATED";

export const toggleButtonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case VISIBILITY_ACTIVATED:
      return { ...state, visibility: action.payload };
    case VISIBILITY_DEACTIVATED:
      return { ...state, visibility: action.payload };
    default:
      return state;
  }
};
