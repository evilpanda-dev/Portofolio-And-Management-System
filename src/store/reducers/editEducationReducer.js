const defaultState = {
  editEducation: false,
};

const EDITEDUCATION_ACTIVATED = "EDITEDUCATION_ACTIVATED";
const EDITEDUCATION_DEACTIVATED = "EDITEDUCATION_DEACTIVATED";

export const editEducationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case EDITEDUCATION_ACTIVATED:
      return { ...state, editEducation: action.payload };
    case EDITEDUCATION_DEACTIVATED:
      return { ...state, editEducation: action.payload };
    default:
      return state;
  }
};
