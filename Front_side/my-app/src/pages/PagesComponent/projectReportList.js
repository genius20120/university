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
    <>
      {list.map((elem, i) => {
        return (
          <div className="container-fluid border bg-light ">
            <div className="row justify-content-sm-center flex-row-reverse gy-5  ">
              <div className="col-sm-7 text-center p-2 ">{`گزارش ${i} `}</div>
              <div className="col-sm-6 text-center ">
                {new Date(elem.created_at).toLocaleDateString("fa-IR")}
              </div>
              <div className="col-sm-6 text-center">
                <a href={elem.file_url}>دانلود توضیحات </a>
              </div>
              <div className="col-sm-12 text-center p-4">
                {elem.description}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
