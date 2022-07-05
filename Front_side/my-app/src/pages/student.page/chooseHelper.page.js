import List from "@mui/material/List";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useState as useReduxState } from "../../hook/useState";
import { Rest } from "../../utils/rest-api";
import toast from "react-hot-toast";
import { MainDiv } from "./style";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const HoverDiv = styled.div`
  &:focus {
    background-color: "#6b6f75";
  }
`;

function HelperList({ list, onClick }) {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <List>
        {list.map((elem, i) => {
          return (
            <React.Fragment key={i}>
              <ListItem
                alignItems="center"
                dir={"rtl"}
                button
                onClick={() => onClick(elem.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Profile"
                    src={elem.photo ? elem.photo : "unknown_avatar.jpeg"}
                  />
                </ListItemAvatar>
                <ListItemText>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "40px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography textAlign={"right"}>
                      {`${elem.first_name} ${elem.last_name}`}
                    </Typography>
                  </div>
                </ListItemText>
              </ListItem>
              {i === list.length - 1 || (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}

export function ChooseHelper() {
  const history = useHistory();
  const onClickHelper = (id) => {
    history.push(`/project/requestProject/${id}`);
  };
  const [helper, setHelper] = useState([]);
  const { auth } = useReduxState();
  useEffect(() => {
    Rest.req({
      url: "/project/helperList",
      method: "GET",
      headers: {
        authorization: "Bearer " + auth.authInfo.token,
      },
    })
      .then((res) => {
        console.log(res);
        setHelper((prevState) => {
          return [...prevState, ...res.helpers];
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  }, []);
  return (
    <MainDiv>
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <HelperList list={helper} onClick={onClickHelper} />
      </div>
    </MainDiv>
  );
}
