import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Rest } from "../../utils/rest-api";
import { useState as useReduxState } from "../../hook/useState";
import toast from "react-hot-toast";

export function ProjectReportList({ projectId, type }) {
  const { auth } = useReduxState();
  const [list, setList] = useState([]);
  useEffect(() => {
    Rest.req({
      url:
        type == "student"
          ? `/project/getProjectReportForStudent`
          : `/project/getProjectReport/${projectId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setList((prevState) => {
          const newState = [...res.reports];

          return newState;
        });
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  }, []);
  return (
    <div
      style={{
        display: "felx",
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <List>
        {(() => {
          console.log("list", list);
          if (list.length > 0)
            return list.map((elem, i) => {
              return (
                <React.Fragment key={i}>
                  <ListItem alignItems="center" dir={"rtl"} button>
                    <ListItemText>
                      <div
                        style={{
                          paddingLeft: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                          height: "150px",
                          overflow: "auto",
                          paddingBottom: "32px",
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
                          <div>
                            <a href={elem.file_url} download>
                              دانلود توضیحات
                            </a>
                          </div>
                          <Typography textAlign={"right"}>
                            {new Date(elem.created_at).toLocaleDateString(
                              "fa-IR"
                            )}
                          </Typography>
                        </div>
                        <Typography
                          style={{ backgroundColor: "white" }}
                          textAlign={"right"}
                        >
                          {elem.description}
                        </Typography>
                      </div>
                    </ListItemText>
                  </ListItem>
                  {i === list.length - 1 || (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              );
            });
        })()}
      </List>
    </div>
  );
}
