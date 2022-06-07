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
    .filter((elem) => elem.role.id == selectValue)[0]
    .role.permisions_of_roles.map((elem) => {
      return {
        name: elem.permision.name,
        id: elem.permision.id,
      };
    });
  const roles = auth.authInfo?.data?.roles_of_users.map((elem) => {
    return (
      <RoleItem value={elem.role.name} key={elem.role.id}>
        {elem.role.name}
      </RoleItem>
    );
  });
  return (
    <>
      <PublicNavContainer active={active}>
        <PublicNavContainerDiv>
          <ImageComponent type="profile" />
          <div>
            <p>{`${auth.authInfo?.data?.first_name || "first_name"} ${
              auth.authInfo?.data?.last_name || "last_name"
            }`}</p>
            <p>{`${auth.authInfo?.data?.role?.name || "role"}`}</p>
            <p>{`${auth.authInfo?.data?.study_field || "field"}`}</p>
          </div>
          <RoleSelect
            defaultValue={auth.authInfo?.data?.roles_of_users[0].role.name}
            onChange={(e) => setSelectValue(e.currentTarget.key)}
          >
            {roles}
          </RoleSelect>
          <ActionMenu>
            <ListComponent listData={listData} />
          </ActionMenu>
        </PublicNavContainerDiv>
        <BackDrop onClick={() => setActive(false)} active={active} />
        <PublicNavOpener onClick={() => setActive(true)} active={active}>
          <ImageComponent image_url="/arrow-icon.png" type="icon" />
        </PublicNavOpener>
      </PublicNavContainer>
    </>
  );
}
