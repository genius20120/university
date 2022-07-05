import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function SearchListComponent({ list, onClick }) {
  const [userList, setUserList] = useState(
    list.map((elem) => ({
      ...elem,
      selected_role: elem.roles[0],
    }))
  );
  return (
    <List>
      {userList.map((elem, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem
              alignItems="center"
              dir={"rtl"}
              button
              onClick={(e) => {
                e.stopPropagation();
                onClick(userList[i]);
              }}
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
                </div>
              </ListItemText>
              <FormControl>
                <InputLabel id="demo-simple-select-label">نقش </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={elem.selected_role}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(event) => {
                    event.stopPropagation();
                    setUserList((prevState) => {
                      const newState = [...prevState];
                      newState[i].selected_role = event.target.value;
                      return newState;
                    });
                  }}
                >
                  {elem.roles.map((role) => {
                    return <MenuItem value={role}>{role.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
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
