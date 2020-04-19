import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./helpers";

import "./index.scss";

import { App } from "./App";

import { configureFakeBackend } from "./helpers";
configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
