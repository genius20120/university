import { MainDiv } from "./style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useState as useReduxState } from "../../hook/useState";
import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { config } from "../../config/config";

export function RequestProject() {
  const history = useHistory();
  const { auth } = useReduxState();
  const helper_id = useParams()["helperId"];
  const [data, setData] = useState({
    helper_id,
    file: null,
    description: "",
  });
  function validation() {
    if (!data.file) return Promise.reject(new Error(" عکس را وارد کنید "));
    if (data.file.size > 1024 * 1024)
      return Promise.reject(new Error("عکس بیشتر از 10 مگابایت  میباشد "));
    return Promise.resolve();
  }
  const restFetch = (event) => {
    event.preventDefault();
    validation()
      .then(async () => {
        const dataForm = new FormData();
        for (let key in data) {
          if (key == "file") dataForm.append(key, data[key], "file");
          else dataForm.append(`${key}`, data[key]);
        }
        await fetch(`${config.REACT_APP_REST_API_URL}/project/requestProject`, {
          body: dataForm,
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.authInfo?.token}`,
          },
        }).then(async (res) => {
          const response = await res.json();
          if (res.status != 200) throw new Error(response.message);
          toast.success("Done");
          history.push("/home");
        });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <>
      <DropBackComponent />
      <UserMenu />
      <MainDiv>
        <form onSubmit={restFetch}>
          <div
            style={{
              height: "100vh",
              width: "90%",
              paddingRight: "10%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "48px",
              backgroundColor: "azure",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-textarea"
                label="توضیحات "
                placeholder="توضیحات"
                minRows={3}
                multiline
                dir={"auto"}
                fullWidth
                onChange={(e) => {
                  setData((prevData) => {
                    return {
                      ...prevData,
                      description: e.target.value,
                    };
                  });
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "48px",
                flexDirection: "row-reverse",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setData((prevData) => {
                      return {
                        ...prevData,
                        file: e.target.files[0],
                      };
                    });
                  }}
                />
              </Button>
            </div>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={restFetch}
            >
              ارسال
            </Button>
          </div>
        </form>
      </MainDiv>
    </>
  );
}
