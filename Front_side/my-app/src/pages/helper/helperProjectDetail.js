import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { Rest } from "../../utils/rest-api";
import { useState as useReduxState } from "../../hook/useState";

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
export function HelperProjectDetail() {
  const history = useHistory();
  const params = useParams();
  const projectId = params["projectId"];
  const { auth } = useReduxState();
  const [data, setData] = useState(null);
  const [projectStatus, setProjectStatus] = useState("");
  const [sendData, SetSendData] = useState({
    project_id: projectId,
    status: true,
  });
  const changeProjectStatus = async (isAccept) => {
    console.log("status", isAccept);
    await SetSendData({ project_id: projectId, status: isAccept });
    console.log(sendData);
    await Rest.req({
      url: `/project/helperChangeStatus`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
        "Content-Type": "application/json",
      },
      data: sendData,
    })
      .then((res) => {
        toast.success("done");
        history.push("/home/helper_operations");
      })
      .catch((E) => {
        toast.error(E.message);
      });
  };
  useEffect(() => {
    Rest.req({
      url: `/project/getProjectDetail/${projectId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setProjectStatus(res.status);
        if (res.status === "waiting_acceptation") setData(res.data);
        else setData(res.reports);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);
  return (
    <MainDiv>
      <UserMenu />
      <DropBackComponent />
      {(() => {
        console.log(projectStatus);
        if (projectStatus === "waiting_acceptation") {
          return (
            <div
              style={{
                width: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "75%",
                  paddingTop: "10%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  height: "90%",
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "16px",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                <label>توضیحات </label>
                <div
                  style={{
                    height: "300px",
                    width: "100%",
                    overflowY: "auto",
                    backgroundColor: "white",
                  }}
                >
                  {data.description}
                </div>
              </div>
              <div>
                <a href={data.file} download>
                  دانلود توضیحات
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  gap: "32px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button onClick={() => changeProjectStatus(true)}>
                  قبول درخواست{" "}
                </button>
                <button onClick={() => changeProjectStatus(false)}>
                  رد درخواست{" "}
                </button>
              </div>
            </div>
          );
        }
      })()}
    </MainDiv>
  );
}
