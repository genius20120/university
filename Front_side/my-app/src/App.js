import { HomePage } from "./pages/home.page";

import toast from "react-hot-toast";
import { SettingPage } from "./pages/setting.page";
import { MessagePage } from "./pages/chat/message.page";
import { InsertStudentPage } from "./pages/insert_user.page/insert_student";
import { InsertField } from "./pages/insert_field.page/insert_field";
import { InsertEmpPage } from "./pages/insert_user.page/insert_emp";
import { InsertProfsPage } from "./pages/insert_user.page/insert_profs";
import { AcceptStudentPage } from "./pages/accept_student.js/accept_student.page";
import { ChatPage } from "./pages/chat/chatPage";
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/login.page";
import "./index.css";
import { Route, Switch, Router } from "react-router-dom";
import { io } from "socket.io-client";
import { config } from "./config/config";
import { useState as useReduxState } from "./hook/useState";
import { RequestProject } from "./pages/student.page/sendProjectRequest.page";
import { StudentPage } from "./pages/student.page/student.page";
import { HelperProjectsPage } from "./pages/helper/helperProjects";
import { HelperProjectDetail } from "./pages/helper/helperProjectDetail";
import { Rest } from "./utils/rest-api";
import { useAction } from "./hook/useActions";
import { InsertSupervisor } from "./pages/insert_supervisor/insert_supervisor";
import { NeedyProject } from "./pages/insert_supervisor/needyProject";

export function App() {
  const { setNotification } = useAction();
  const { auth } = useReduxState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (auth?.authInfo?.data?.room_id)
      setSocket(io.connect(config.REACT_APP_REST_API_URL));
  }, []);
  useEffect(() => {
    if (auth?.authInfo?.data?.room_id && socket != null)
      socket.emit("join_room", { room_id: auth?.authInfo?.data?.room_id });
  }, []);
  useEffect(() => {
    if (auth?.authInfo?.data?.room_id && socket != null)
      socket.on("recieve_message", (data) => {
        toast("پیام جدید دریافت شد ", {
          icon: "📩",
        });
      });
  }, []);
  useEffect(() => {
    Rest.req({
      url: "/project/hasNewNotification",
      method: "GET",
      headers: {
        authorization: "Bearer " + auth.authInfo.token,
      },
    })
      .then((res) => {
        setNotification(true);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);

  return (
    <Switch>
      <Route path={"/home/insertSuperVisor/:project_id"}>
        <InsertSupervisor />
      </Route>
      <Route path={"/home/assign_project_supervisors"}>
        <NeedyProject />
      </Route>
      <Route path={"/home/getProjectDetail/:projectId"}>
        <HelperProjectDetail />
      </Route>
      <Route path={"/home/helper_operations"}>
        <HelperProjectsPage />
      </Route>
      <Route path={"/user/chatPage/:id/:room_id"}>
        <ChatPage />
      </Route>
      <Route path={"/student_project"}>
        <StudentPage />
      </Route>
      <Route path={"/home/student_project"}>
        <StudentPage />
      </Route>
      <Route path={"/project/requestProject/:helperId"}>
        <RequestProject />
      </Route>
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
  );
}
