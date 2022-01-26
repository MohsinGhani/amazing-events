import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer/index";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToLocalStorage = (state) => {
  try {
    const serilazedState = JSON.stringify(state);
    localStorage.setItem("state", serilazedState);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serilazedState = localStorage.getItem("state");
    if (serilazedState === null) return undefined;
    return JSON.parse(serilazedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const presistedState = loadFromLocalStorage();
export const store = createStore(
  reducer,
  presistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));
