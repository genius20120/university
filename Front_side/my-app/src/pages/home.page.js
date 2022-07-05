import { PageLayoutComponent } from "../components/pageLayout.components";
import { RootDivHomePage } from "../Styles/homePage.style";
import { DropBackComponent } from "../components/dropBack.component";
import { InsertRolePage } from "./insert_role.page/insert_role.page";
import { UserMenu } from "../components/userMenu.compnent";
import { useState } from "../hook/useState";
import { StudentPage } from "./student.page/student.page";

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
  const { auth } = useState();
  const role = auth.authInfo.data.roles_of_users[0].role.name;
  return (
    <>
      <UserMenu active={"home"} />
      <DropBackComponent />
      <RootDivHomePage>
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          {(() => {
            if (role === "student") return <StudentPage />;
            else return <InsertRolePage />;
          })()}
        </div>
      </RootDivHomePage>
    </>
  );
}
