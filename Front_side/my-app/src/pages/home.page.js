import { PageLayoutComponent } from "../components/pageLayout.components";
import { RootDivHomePage } from "../Styles/homePage.style";
import AnalogClock from "analog-clock-react";
import moment from "moment";
import { DropBackComponent } from "../components/dropBack.component";
import { InsertRolePage } from "./insert_role.page/insert_role.page";
import { UserMenu } from "../components/userMenu.compnent";

export function HomePage() {
  const options = {
    width: "300px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };

  return (
    <>
      <UserMenu active={"home"} />
      <DropBackComponent />
      <RootDivHomePage>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <AnalogClock {...options} />
          <p>{moment().format("ll")}</p> */}
          <InsertRolePage />
        </div>
      </RootDivHomePage>
    </>
  );
}
