import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";

export function SelectedList({ list }) {
  return (
    <List>
      {list.map((elem, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem alignItems="center" dir={"rtl"} button>
              <ListItemAvatar>
                <Avatar
                  alt="Profile"
                  src={elem.photo ? elem.photo : "unknown_avatar.jpeg"}
                />
              </ListItemAvatar>
              <ListItemText>
                <div
                  style={{
                    paddingLeft: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "40px",
                    flexWrap: "wrap",
                  }}
                >
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
                  <Typography textAlign={"right"}>
                    {elem.selected_role.name}
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
  );
}
