import { useState } from "react";
import { useHistory } from "react-router-dom";
import { MainDiv, Image } from "../Styles/userMenu.style";

export function UserMenu() {
  const history = useHistory();
  const url = history.location.pathname;
  return (
    <MainDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          height: "100%",
          weight: "100%",
          borderRadius: "20px",
        }}
      >
        <Image
          src="/home_icon.svg"
          active={url.startsWith("/home")}
          onClick={() => {
            history.push("/home");
          }}
        />
        <Image
          src="/notification.svg"
          hasBorder={true}
          active={url == "/setting"}
          onClick={() => {
            history.push("/setting");
          }}
        />

        <Image
          src="/chat.svg"
          active={url == "/message"}
          onClick={() => {
            history.push("/message");
          }}
        />
      </div>
    </MainDiv>
  );
}
