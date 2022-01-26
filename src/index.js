import React from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";
import Routes from "./routes/routes";
import { store } from "./store/index";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
// import Axios from "axios";
// const port = process.env.PORT || 5000;
// Axios.defaults.baseURL = `http://localhost:${port}`;

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
