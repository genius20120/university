import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { config } from "../../config/config";
import { useState as useReduxState } from "../../hook/useState";
import { Rest } from "../../utils/rest-api";
import toast from "react-hot-toast";

const BackButtom = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 60px;
  &:hover {
    background-color: lightgray;
  }
`;
const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ myMessage }) => (myMessage ? "row-reverse" : "row")};
`;
const MessageText = styled.label`
  width: 45%;
  padding-right: ${({ myMessage }) => (myMessage ? "24px" : 0)};
  padding-left: ${({ myMessage }) => (!myMessage ? "24px" : 0)};
  background-color: ${({ myMessage }) => (myMessage ? "#284f46" : "#343d3b")};
  font-size: 12px;
  border-bottom-right-radius: 20%;
  padding-top: 30px;
  padding-bottom: 30px;
  color: white;
`;
const InputMessageDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: right;
  z-index: 1;
  width: 80%;
  height: 48px;
  margin-bottom: 16px;
  padding-left: 9%;
  padding-right: 9%;
`;
function Message({ sender_id, sent_at, text, id }) {
  return (
    <MessageContainer myMessage={id == sender_id}>
      <MessageText myMessage={id == sender_id}>{text}</MessageText>
      <label>{new Date(sent_at).toLocaleDateString("fa-IR")}</label>
    </MessageContainer>
  );
}
export function ChatPage() {
  const [message, setMessage] = useState([]);
  const history = useHistory();
  const { auth } = useReduxState();
  const sender_id = auth.authInfo?.data?.id;
  const socket = io.connect(config.REACT_APP_REST_API_URL);
  const mySocket = io.connect(config.REACT_APP_REST_API_URL);
  const params = useParams();
  const reciever_id = params.id;
  const room_id = params.room_id;
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const size = 50;
  const [data, setData] = useState({
    sender_id,
    reciever_id,
    room_id,
    message: "",
  });
  const chat = useRef();
  useEffect(() => {
    console.log("scroll log");
    if (chat.current) {
      chat.current.scrollTop = chat.current.scrollHeight;
    }
  }, [message, chat.current]);
  useEffect(() => {
    if (auth?.authInfo?.data?.room_id) {
      mySocket.emit("join_room", {
        room_id: auth?.authInfo?.data?.room_id,
      });
      mySocket.on("recieve_message", (data) => {
        if (data.sender_id == reciever_id)
          setMessage((prevState) => {
            const newState = [...prevState];
            newState.unshift({
              sender_id: data.sender_id,
              text: data.message,
              sent_at: new Date(),
            });
            return newState;
          });
        if (chat.current) {
          chat.current.scrollTop = chat.current.scrollHeight;
        }
      });
    }
  }, []);
  const loadPrevMessage = () => {
    Rest.req({
      url: `/chat/getChat/${page}/${size}/${reciever_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        setCount(res.count);
        setMessage((prevState) => {
          const newState = [...prevState];
          newState.push(...res.data);
          return newState;
        });
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  useEffect(() => {
    Rest.req({
      url: `/chat/getChat/${page}/${size}/${reciever_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        setCount(res.count);
        setMessage((prevState) => {
          prevState.push(...res.data);
          return prevState;
        });
      })
      .catch((e) => {
        toast.error(e);
      });
  }, []);
  useEffect(() => {
    socket.emit("join_room", { room_id });
  }, []);
  return (
    <div
      style={{
        height: `100vh`,
        width: "100%",
        backgroundColor: "#b4cfc9",
      }}
    >
      <BackButtom
        onClick={() => {
          history.push("/message");
        }}
      >
        <img
          src={"/back_icon.png"}
          style={{
            width: "80%",
            height: "80%",
            padding: "10px",
          }}
        />
      </BackButtom>
      <InputMessageDiv>
        <form
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={chat}
          onSubmit={async (e) => {
            e.preventDefault();
            setData((prevState) => {
              return {
                ...prevState,
                message: "",
              };
            });
            await socket.emit("send_message", data);
            setMessage((prevState) => {
              const newState = [...prevState];
              newState.unshift({
                sender_id: data.sender_id,
                sent_at: new Date(),
                text: data.message,
              });
              setCount(count + 1);
              return newState;
            });
            if (chat.current) {
              chat.current.scrollTop = chat.current.scrollHeight;
            }
          }}
        >
          <textarea
            style={{
              textAlign: "right",
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              paddingLeft: "12px",
              paddingRight: "12px",
              resize: "horizontal",
            }}
            value={data.message}
            onChange={(e) => {
              setData((prevState) => {
                return {
                  ...prevState,
                  message: e.target.value,
                };
              });
            }}
          />
          <button
            type={"submit"}
            style={{
              width: "20%",
              height: "100%",
              borderRadius: "15px",
              backgroundColor: "white",
              border: "none",
            }}
          >
            <img
              style={{
                width: "24px",
                height: "24px",
              }}
              src={"/send.png"}
            />
          </button>
        </form>
      </InputMessageDiv>

      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "auto",
          width: "100%",
          height: "100%",
          paddingBottom: "80px",
          backgroundColor: "#b4cfc9",
        }}
        onScroll={(e) => {
          if (
            e.target.scrollHeight + e.target.scrollTop ===
            e.target.clientHeight
          ) {
            if ((page - 1) * size < count) {
              setPage(page + 1);
              loadPrevMessage();
            }
          }
        }}
      >
        {message.map((elem) => {
          return (
            <Message
              sent_at={elem.sent_at}
              text={elem.text}
              sender_id={elem.sender_id}
              id={sender_id}
            />
          );
        })}
      </div>
    </div>
  );
}
