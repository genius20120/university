import { UserMenu } from "../../components/userMenu.compnent";
import { Button, Label, SearchDiv, SearchInput, FieldDiv } from "./style";
import { useState } from "react";
import { useState as useReduxState } from "../../hook/useState";
import toast from "react-hot-toast";
import { Rest } from "../../utils/rest-api";
import { SearchListComponent } from "./searchListComponent";

export function SearchComponent({ project_id = 1, onClick }) {
  const { auth } = useReduxState();
  const [userFilter, setUserFilter] = useState({
    first_name: "",
    last_name: "",
    personal_id: null,
  });
  const [users, setUsers] = useState([]);
  const searchUser = async () => {
    setUsers([]);
    await Rest.req({
      url: `/user/searchSupervisorUser`,
      method: "POST",
      data: { filter: userFilter, project_id },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setUsers((prevState) => {
          return [...res];
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <>
      <SearchDiv>
        <FieldDiv>
          <Label>:نام</Label>
          <SearchInput
            type={"text"}
            onChange={(e) => {
              setUserFilter((prevState) => {
                return {
                  ...prevState,
                  first_name: e.target.value,
                };
              });
            }}
          />
        </FieldDiv>
        <FieldDiv>
          <Label> :نام خانوادگی</Label>
          <SearchInput
            type={"text"}
            onChange={(e) => {
              setUserFilter((prevState) => {
                return {
                  ...prevState,
                  last_name: e.target.value,
                };
              });
            }}
          />
        </FieldDiv>
        <FieldDiv>
          <Label> :شماره پرسنلی / دانشجویی </Label>
          <SearchInput
            type={"text"}
            onChange={(e) => {
              setUserFilter((prevState) => {
                return {
                  ...prevState,
                  personal_id: e.target.value,
                };
              });
            }}
          />
        </FieldDiv>
        <Button onClick={searchUser}> جست و جو</Button>
      </SearchDiv>
      {(() => {
        if (users.length > 0)
          return <SearchListComponent list={users} onClick={onClick} />;
      })()}
    </>
  );
}
