const defaultState = {
  edit: false,
};

const EDIT_ACTIVATED = "EDIT_ACTIVATED";
const EDIT_DEACTIVATED = "EDIT_DEACTIVATED";

export const openEditreducer = (state = defaultState, action) => {
  switch (action.type) {
    case EDIT_ACTIVATED:
      return { ...state, edit: action.payload };
    case EDIT_DEACTIVATED:
      return { ...state, edit: action.payload };
    default:
      return state;
  }
};
