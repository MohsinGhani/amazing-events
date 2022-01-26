import { Get_LogIn_State } from "./actionTypes";

export const getLogInState = (state) => {
  return {
    type: Get_LogIn_State,
    payload: {
      isAuthenticated: state,
    },
  };
};
