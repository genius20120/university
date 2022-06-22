import { useState } from "react";
import { DropBackComponent } from "../../components/dropBack.component";
import { InputFormComponent } from "../../components/inputForm.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { Rest } from "../../utils/rest-api";
import { Form, Div } from "./style";
import { useState as useReduxState } from "../../hook/useState";
import toast from "react-hot-toast";
import { Button } from "../../Styles/button.style";

export function InsertField() {
  const [data, setData] = useState({
    name: "",
  });
  const { auth } = useReduxState();
  const restFetch = async (event) => {
    event.preventDefault();
    Rest.req({
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
      url: "/user/insert/field",
    })
      .then((res) => {
        toast.success("done");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };
  return (
    <>
      <UserMenu active={"home"} />
      <DropBackComponent />
      <Div>
        <Form onSubmit={restFetch}>
          <InputFormComponent
            formKey={"name"}
            setValue={setData}
            name={"رشته"}
            type={"text"}
          />
          <Button type={"submit"}>تایید </Button>
        </Form>
      </Div>
    </>
  );
}
