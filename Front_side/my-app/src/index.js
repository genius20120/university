import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./pages/login.page";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { HomePage } from "./pages/home.page";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { SettingPage } from "./pages/setting.page";
import { MessagePage } from "./pages/chat/message.page";
import { InsertStudentPage } from "./pages/insert_user.page/insert_student";
import { InsertField } from "./pages/insert_field.page/insert_field";
import { InsertEmpPage } from "./pages/insert_user.page/insert_emp";
import { InsertProfsPage } from "./pages/insert_user.page/insert_profs";
import { AcceptStudentPage } from "./pages/accept_student.js/accept_student.page";

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
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path={"/home/accepting_students"}>
            <AcceptStudentPage />
          </Route>
          <Route path={"/home/inserting_study_fields"}>
            <InsertField />
          </Route>
          <Route path={"/home/inserting_prof"}>
            <InsertProfsPage />
          </Route>
          <Route path={"/home/inserting_emp"}>
            <InsertEmpPage />
          </Route>
          <Route path={"/home/inserting_student"}>
            <InsertStudentPage />
          </Route>
          <Route path={"/message"}>
            <MessagePage />
          </Route>
          <Route path={"/setting"}>
            <SettingPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Provider>
    </Router>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
