import "./css/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, compose(applyMiddleware(ReduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
