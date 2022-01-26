import { Get_LogIn_State } from "../action/actionTypes";

const initState = {
  isAuthenticated: false,
};

export default function getLogInState(state = initState, action) {
  switch (action.type) {
    case Get_LogIn_State:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };

    default:
      return state;
  }
}
