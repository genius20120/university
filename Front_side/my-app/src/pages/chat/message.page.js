import { UserMenu } from "../../components/userMenu.compnent";
import { Button, Label, SearchDiv, SearchInput } from "./style";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { Rest } from "../../utils/rest-api";
import TextField from "@mui/material/TextField";
import { useState as useReduxState } from "../../hook/useState";
import { lightBlue } from "@mui/material/colors";

export function MessagePage() {
  const [roles, setRoles] = useState([]);
  const [filteredRole, setFilteredRole] = useState(null);
  const { auth } = useReduxState();
  useEffect(() => {
    Rest.req({
      url: "/role/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    }).then((res) => {
      setRoles(res);
    });
  });
  return (
    <div>
      <UserMenu active={"message"} />
      <SearchDiv>
        <Label>:نام</Label>
        <SearchInput type={"text"} />
        <Label> :نام خانوادگی</Label>
        <SearchInput type={"text"} />
        <Label> :شماره پرسنلی / دانشجویی </Label>
        <SearchInput type={"text"} />
        {/* <Autocomplete
          sx={{
            alignItems: "center",
            width: "20%",
            color: lightBlue,
            backgroundColor: "lightgray",
            height: "48px",
            padding: 0,
            margin: 0,
          }}
          fullWidth
          id="tags-standard"
          options={roles}
          getOptionLabel={(option) => {
            return option.name;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="نقش"
              placeholder="نقش"
            />
          )}
          onChange={(event, value) => {
            setFilteredRole(value);
          }}
        /> */}
        <Button> جست و جو</Button>
      </SearchDiv>
    </div>
  );
}
