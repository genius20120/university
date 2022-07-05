import { height } from "@mui/system";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { Rest } from "../../utils/rest-api";
import { SearchComponent } from "./searchComponet";
import { SelectedList } from "./selectedList";
import { useState as useRedux } from "../../hook/useState";
import toast from "react-hot-toast";

const MainDiv = styled.div`
  padding-right: 10%;
  width: 90%;
  height: 91vh;
  padding-bottom: 9%;
  background-color: azure;
  overflow-y: auto;
`;
export function InsertSupervisor() {
  const history = useHistory();
  const params = useParams();
  const project_id = params["project_id"];
  const { auth } = useRedux();
  const [selectedUser, setSelectedUser] = useState([]);
  const onClickUser = (newUser) => {
    setSelectedUser((prevState) => {
      return [...prevState, newUser];
    });
  };
  const selectSupervisor = async () => {
    Rest.req({
      method: "POST",
      data: {
        project_id,
        supervisor: selectedUser.map((elem) => {
          return {
            role_id: elem.selected_role.id,
            user_id: elem.id,
          };
        }),
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
      url: "/project/insertSupervisor",
    })
      .then((res) => {
        history.push("/home/assign_project_supervisors");
        toast.success("done");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <MainDiv>
      <UserMenu />
      <DropBackComponent />
      <div
        style={{
          paddingTop: "48px",
          paddingRight: "2%",
          paddingLeft: "2%",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          width: "96%",
          height: "100%",
          overflow: "auto",
          flexWrap: "wrap",
        }}
      >
        <label
          style={{
            textAlign: "right",
          }}
        >
          افراد انتخاب شده{" "}
        </label>
        <SelectedList list={selectedUser} />
        <button onClick={() => selectSupervisor()}>انتخاب ناظران </button>
        <SearchComponent onClick={onClickUser} />
      </div>
    </MainDiv>
  );
}
