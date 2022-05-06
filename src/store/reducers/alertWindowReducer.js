const defaultState = {
    isWindowAlert: false,
  };
  
  const WINDOW_ACTIVATED = "WINDOW_ACTIVATED";
  const WINDOW_DEACTIVATED = "WINDOW_DEACTIVATED";
  
  export const alertWindowReducer = (state = defaultState, action) => {
    switch (action.type) {
      case WINDOW_ACTIVATED:
        return { ...state, isWindowAlert: action.payload };
      case  WINDOW_DEACTIVATED:
        return { ...state, isWindowAlert: action.payload };
      default:
        return state;
    }
  };
  