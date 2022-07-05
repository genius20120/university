import { UserMenu } from "../../components/userMenu.compnent";
import { Button, Label, SearchDiv, SearchInput, FieldDiv } from "./style";
import { useState, useEffect } from "react";
import { Rest } from "../../utils/rest-api";
import { useState as useReduxState } from "../../hook/useState";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { UserChat } from "./userChat";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { config } from "../../config/config";

export function MessagePage() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [userFilter, setUserFilter] = useState({
    first_name: "",
    last_name: "",
    personal_id: null,
  });
  const [page, setPage] = useState(1);
  const size = 50;
  const { auth } = useReduxState();
  const [reloadPage, setReloadPage] = useState(false);
  const mySocket = io.connect(config.REACT_APP_REST_API_URL);
  useEffect(() => {
    if (auth?.authInfo?.data?.room_id && mySocket != null) {
      mySocket.emit("join_room", { room_id: auth?.authInfo?.data?.room_id });
      mySocket.on("recieve_message", (data) => {
        setReloadPage(true);
      });
    }
  }, []);
  useEffect(() => {
    setUsers([]);
    setLoading(true);
    Rest.req({
      url: `/chat/getConversations/${page}/${size}`,
      method: "Get",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        setReloadPage(false);
        setUsers((prevState) => {
          return [...prevState, ...res.data];
        });
        setCount(res.count);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false);
      });
  }, [reloadPage]);
  const searchUser = async () => {
    setUsers([]);
    setLoading(true);
    await Rest.req({
      url: `/user/searchUser/${page}/${size}`,
      method: "POST",
      data: userFilter,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setUsers((prevState) => {
          return [...prevState, ...res.data];
        });
        setCount(res.count);
        setLoading(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "lightblue",
        paddingTop: "12px",
        paddingBottom: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <UserMenu active={"message"} />
      <SearchDiv>
        <FieldDiv>
          <Label>:نام</Label>
          <SearchInput
            type={"text"}
            onChange={(e) => {
              setUserFilter((prevState) => {
                return {
                  ...prevState,
                  first_name: e.target.value,
                };
              });
            }}
          />
        </FieldDiv>
        <FieldDiv>
          <Label> :نام خانوادگی</Label>
          <SearchInput
            type={"text"}
            onChange={(e) => {
              setUserFilter((prevState) => {
                return {
                  ...prevState,
                  last_name: e.target.value,
                };
              });
            }}
          />
        </FieldDiv>
        <FieldDiv>
          <Label> :شماره پرسنلی / دانشجویی </Label>
          <SearchInput
            type={"text"}
            onChange={(e) => {
              setUserFilter((prevState) => {
                return {
                  ...prevState,
                  personal_id: e.target.value,
                };
              });
            }}
          />
        </FieldDiv>
        <Button onClick={searchUser}> جست و جو</Button>
      </SearchDiv>
      <div
        onScroll={(e) => {
          const scrollBottom = e.target.scrollHeight - e.target.scrollTop;
          if (e.target.clientHeight === scrollBottom) {
            if ((page - 1) * size < count) {
              setPage(page + 1);
              searchUser();
            }
          }
        }}
        style={{
          paddingTop: "16px",
          overflow: "auto",
        }}
      >
        {(() => {
          return users.map((user) => (
            <UserChat
              key={user.id}
              first_name={user.first_name}
              last_name={user.last_name}
              id={user.id}
              photo={user.photo}
              room_id={user.room_id}
              isSeen={user.isSeen}
              onClick={(id, room_id) => {
                console.log("room_id of ", room_id, "passed to url ");
                history.push(`/user/chatPage/${id}/${room_id}`);
              }}
            />
          ));
        })()}
      </div>
      {(() => {
        if (loading) {
          return (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          );
        }
      })()}
    </div>
  );
}
