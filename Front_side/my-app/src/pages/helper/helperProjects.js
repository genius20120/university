import styled from "styled-components";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { ProjectListComponent } from "../PagesComponent/projectList.component";
import { useState as useRedux } from "../../hook/useState";
import { useEffect, useState } from "react";
import { Rest } from "../../utils/rest-api";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

const MainDiv = styled.div`
  padding-right: 10%;
  width: 90%;
  height: 91vh;
  padding-bottom: 9%;
  background-color: azure;
  overflow-y: auto;
  @media (min-width: 720px) {
    width: 94%;
    padding-right: 6%;
  }
`;
export function HelperProjectsPage() {
  const { auth } = useRedux();
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    Rest.req({
      url: "/project/getHelperProjects",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        const projects = res.project.map((elem) => {
          console.log(elem.status);
          switch (elem.status) {
            case "waiting_acceptation":
              return {
                ...elem,
                status: "در انتظار تایید ",
              };
              break;
            default:
              return {
                ...elem,
                status: "نا مشخص ",
              };
          }
        });
        setData((prevState) => {
          return [...prevState, ...projects];
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);
  const onClickFuntion = (projectId) => {
    history.push(`/home/getProjectDetail/${projectId}`);
  };

  return (
    <MainDiv>
      <UserMenu />
      <DropBackComponent />
      <div
        style={{
          paddingTop: "10%",
          height: "90%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            height: "32px",
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <label>پروژه های شما </label>
        </div>
        <ProjectListComponent list={data} onClick={onClickFuntion} />
      </div>
    </MainDiv>
  );
}
