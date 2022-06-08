import {
  PublicNavContainer,
  ActionMenu,
  PublicNavContainerDiv,
  BackDrop,
  PublicNavOpener,
  RoleSelect,
  RoleItem,
} from "../Styles/homePage.style";
import { useState as useReduxState } from "../hook/useState";
import { ListComponent } from "../components/list.component";
import { useState } from "react";
import { ImageComponent } from "../components/image.component";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";

export function DropBackComponent() {
  const [active, setActive] = useState(true);
  const { auth } = useReduxState();
  const [selectValue, setSelectValue] = useState(
    auth.authInfo?.data?.roles_of_users[0].role.id
  );
  const listData = auth.authInfo?.data?.roles_of_users
    .filter((elem) => {
      if (elem.role.id == selectValue) {
        return elem;
      }
    })[0]
    .role.permisions_of_roles.map((elem) => elem.permision);
  const roles = auth.authInfo?.data?.roles_of_users.map((elem) => {
    return (
      <RoleItem value={elem.role.id} key={elem.role.id}>
        {elem.role.name}
      </RoleItem>
    );
  });
  return (
    <>
      <PublicNavContainer active={active}>
        <PublicNavContainerDiv>
          <ImageComponent
            type="profile"
            image_url={auth.authInfo?.data?.photo || null}
          />
          <div>
            <p>{`${auth.authInfo?.data?.first_name || "first_name"} ${
              auth.authInfo?.data?.last_name || "last_name"
            }`}</p>
            <p>{`${auth.authInfo?.data?.study_field || ""}`}</p>
          </div>
          <RoleSelect
            defaultValue={auth.authInfo?.data?.roles_of_users[0].role.name}
            onChange={(e) => {
              const selectedIndex = e.target.options.selectedIndex;
              console.log("fffffff", e.target.value);

              setSelectValue(e.target.value);
            }}
          >
            {roles}
          </RoleSelect>
          <ActionMenu>
            <ListComponent listData={listData} />
          </ActionMenu>
        </PublicNavContainerDiv>
        <BackDrop onClick={() => setActive(false)} active={active} />
        <PublicNavOpener onClick={() => setActive(true)} active={active}>
          <ImageComponent image_url="/left_arrow_icon.svg" type="icon" />
        </PublicNavOpener>
      </PublicNavContainer>
    </>
  );
}
