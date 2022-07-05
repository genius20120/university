import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const theme = {
  body: {
    button: "lightblue",
    borderRadius: "4px",
    iconHeight: "30px",
  },
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Toaster position="top-center" reverseOrder={false} />
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
