const defaultState = {
  isNewsletter: false,
};

const SHOW_NEWSLETTER = "SHOW_NEWSLETTER";
const HIDE_NEWSLETTER = "HIDE_NEWSLETTER";

export const newsLetterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_NEWSLETTER:
      return { ...state, isNewsletter: action.payload };
    case HIDE_NEWSLETTER:
      return { ...state, isNewsletter: action.payload };
    default:
      return state;
  }
};
