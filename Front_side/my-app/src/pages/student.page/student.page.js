import { useEffect } from "react";
import { Rest } from "../../utils/rest-api";
import { useState as useReduxState } from "../../hook/useState";
import { useState } from "react";
import { ChooseHelper, HelperList } from "./chooseHelper.page";
import { UserMenu } from "../../components/userMenu.compnent";
import { DropBackComponent } from "../../components/dropBack.component";
import { WaitingPage } from "./Waiting.page";
import { InprogressPage } from "./inProgressPage";

export function StudentPage() {
  console.log("its rendering ");
  const { auth } = useReduxState();
  const [status, setStatus] = useState({
    first_name: "",
    last_name: "",
    status: "",
  });
  useEffect(() => {
    Rest.req({
      url: "/project/getStatus  ",
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.authInfo.token,
      },
    })
      .then((res) => {
        console.log(res);
        setStatus((prevStatus) => {
          return {
            ...prevStatus,
            ...res,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        paddingTop: "9%",
        backgroundColor: "azure",
        overflow: "auto",
      }}
    >
      {(() => {
        switch (status.status) {
          case "no_project":
            return <ChooseHelper />;
            break;
          case "waiting_acceptation":
            return <WaitingPage status={status.status} />;
            break;
          case "rejected":
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    paddingRight: "10%",
                  }}
                >
                  درخواست شما رد شد{" "}
                </div>{" "}
                <ChooseHelper />
              </div>
            );
          case "in_progress":
            return <InprogressPage />;
            break;
          default:
            break;
        }
      })()}
    </div>
  );
}
