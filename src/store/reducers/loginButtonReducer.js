const defaultState = {
    popup: false
  }
  
  const LOGIN_CLICKED = 'LOGIN_CLICKED'
  const LOGIN_CLOSED = 'LOGIN_CLOSED'
  
  export const loginButtonReducer = (state = defaultState, action) => {
    switch (action.type) {
      case LOGIN_CLICKED:
        return { ...state, popup: action.payload }
      case LOGIN_CLOSED:
        return { ...state, popup: action.payload }
      default:
        return state
    }
  }