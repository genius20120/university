import { useState } from "react";
import InputComponent from "../components/input.component";
import { useHistory } from "react-router-dom";
import { PageLayoutComponent } from "../components/pageLayout.components";
import { Button } from "../Styles/button.style";
import { RootDivLoginPage } from "../Styles/loginPage";
import { Rest } from "../utils/rest-api";
import { useAction } from "../hook/useActions";
import { useState as useReduxState } from "../hook/useState";

const LoginPage = function () {
  const [phone, setPhone] = useState(null);
  const [code, setCode] = useState(null);
  const actions = useAction();
  const states = useReduxState();
  const onChange = (data, type) => {
    if (type == "phone") setPhone(data);
    if (type == "code") setCode(data);
  };
  const restFetch = async (event) => {
    try {
      event.preventDefault();
      const data = await Rest.req({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          phone,
          code,
        },
        url: "/login",
      });
      actions.setAuthenticatedUser(data);

      history.push("/home");
    } catch (e) {}
  };
  const history = useHistory();
  return (
    <PageLayoutComponent>
      <form onSubmit={restFetch}>
        <RootDivLoginPage>
          <InputComponent
            defultValue="شماره تلفن "
            onChange={(e) => onChange(e.target.value, "phone")}
            textAlign="left"
          />
          <InputComponent
            defultValue="کد ارسال شده "
            onChange={(e) => onChange(e.target.value, "code")}
            textAlign="left"
          />
          <Button type="submit">Enter</Button>
        </RootDivLoginPage>
      </form>
    </PageLayoutComponent>
  );
};
export default LoginPage;
