import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { Rest } from "../../utils/rest-api";
import { UserDetails } from "./userDetail.component";
import { useState as useReduxState } from "../../hook/useState";

const MainDiv = styled.div`
  padding-right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 720px) {
    padding-right: 10%;
  }
`;

export function AcceptStudentPage() {
  const { auth } = useReduxState();
  const [acceptedUser, setAcceptedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const size = 5;
  const acceptUser = async (id) => {
    setUsers([]);
    if (acceptUser != null) {
      await Rest.req({
        url: `/user/accepting_students/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authInfo?.token}`,
        },
      })
        .then((res) => {
          toast.success("done");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  };
  useEffect(() => {
    Rest.req({
      url: `/user/notActive/getAll/${page}/${size}`,
      method: "GET",
    })
      .then((res) => {
        setUsers([]);
        setAcceptedUser(null);
        setUsers((prv) => {
          return [...prv, ...res.user];
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, [acceptedUser]);
  const userInfo =
    users.length != 0 ? (
      users.map((info) => (
        <UserDetails
          acceptedUser={acceptedUser}
          key={info.id}
          data={info}
          onClick={async (id) => {
            setAcceptedUser(1);
            await acceptUser(id);
          }}
        />
      ))
    ) : (
      <>دانشجویی برای تایید در انتظار نیست </>
    );
  return (
    <>
      <UserMenu active={"home"} />
      <DropBackComponent />
      <MainDiv>{userInfo}</MainDiv>
    </>
  );
}
