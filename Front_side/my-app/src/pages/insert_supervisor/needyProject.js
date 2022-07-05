import { useEffect, useState } from "react";
import { Rest } from "../../utils/rest-api";
import { useState as useReduxState } from "../../hook/useState";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { ProjectListComponent } from "../PagesComponent/projectList.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { DropBackComponent } from "../../components/dropBack.component";
import styled from "styled-components";

const MainDiv = styled.div`
  padding-right: 10%;
  padding-top: 48px;
  width: 90%;
  height: 91vh;
  padding-bottom: 9%;
  overflow-y: auto;
  background-color: azure;
`;
export function NeedyProject() {
  const { auth } = useReduxState();
  const history = useHistory();
  const [project, setProject] = useState([]);
  const onCLick = (projectId) => {
    history.push(`/home/insertSupervisor/${projectId}`);
  };
  useEffect(() => {
    Rest.req({
      url: "/project/getProjectSupervisorNeed",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setProject(res.project);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);
  return (
    <MainDiv>
      <UserMenu />
      <DropBackComponent />
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          paddingBottom: "64px",
        }}
      >
        پروژه هایی که باید برای ان ها ناظر انتخاب کنید
      </div>
      <ProjectListComponent list={project} onClick={onCLick} />
    </MainDiv>
  );
}
