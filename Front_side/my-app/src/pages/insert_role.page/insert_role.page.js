import { useEffect } from "react";
import { useState } from "react";
import { Rest } from "../../utils/rest-api";
import { useState as useReduxState } from "../../hook/useState";
import InputComponent from "../../components/input.component";
import { RootDiv } from "./style";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "../../Styles/button.style";

export function InsertRolePage() {
  const [permision, setPermision] = useState([]);
  const [data, setData] = useState({
    name: "",
    score: "",
    permisions: [],
  });
  console.log(data);
  const { auth } = useReduxState();
  useEffect(() => {
    Rest.req({
      url: "/role/permision/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    }).then((res) => {
      console.log(res);
      setPermision(res.data);
    });
  }, []);
  const restFetch = async (event) => {
    try {
      event.preventDefault();
      Rest.req({
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authInfo?.token}`,
        },
        url: "/role/insert",
      }).then((res) => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return permision.length > 0 ? (
    <form onSubmit={restFetch}>
      <RootDiv>
        <label>نام نقش </label>
        <InputComponent
          onChange={(e) =>
            setData((prevState) => {
              return {
                ...prevState,
                name: e.target.value,
              };
            })
          }
        ></InputComponent>
        <label>ضریب نمره دهی </label>
        <InputComponent
          type="number"
          onChange={(e) =>
            setData((prevState) => {
              return {
                ...prevState,
                score: +e.target.value,
              };
            })
          }
          textAlign={"left"}
        ></InputComponent>
        <label>دسترسی ها </label>
        <Autocomplete
          multiple
          fullWidth
          id="tags-standard"
          options={permision}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
          onChange={(event, value) => {
            setData((prevState) => {
              return {
                ...prevState,
                permisions: value.map((elem) => elem.id),
              };
            });
          }}
        />
        <Button type="submit"> ارسال </Button>
      </RootDiv>
    </form>
  ) : (
    <div style={{ display: "flex" }}>
      <CircularProgress />
    </div>
  );
}
