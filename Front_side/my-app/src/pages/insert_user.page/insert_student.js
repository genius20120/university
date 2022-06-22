import { useState, useEffect } from "react";
import { DropBackComponent } from "../../components/dropBack.component";
import { InputFormComponent } from "../../components/inputForm.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { Rest } from "../../utils/rest-api";
import { Form, Div } from "./style";
import { useState as useReduxState } from "../../hook/useState";
import toast from "react-hot-toast";
import { Button } from "../../Styles/button.style";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Autocomplete from "@mui/material/Autocomplete";
import { config } from "../../config/config";

export function InsertStudentPage() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    national_id: null,
    personal_id: null,
    birthday: new Date(),
    entery_year: null,
    role_ids: [],
    field_id: null,
    file: null,
  });
  const [roles, setRoles] = useState([]);
  const [fields, setFields] = useState([]);
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
    Rest.req({
      url: "/user/getAll/field",
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.authInfo?.token}`,
      },
    }).then((res) => {
      setFields(res.data);
    });
  }, []);

  const { auth } = useReduxState();
  function validation() {
    if (!data.birthday && data.birthday.getTime() > new Date().getTime())
      return Promise.reject(new Error("تاریخ تولد درست نمیباشد "));
    if (!data.file) return Promise.reject(new Error(" عکس را وارد کنید "));
    if (data.file.size > 1024 * 1024)
      return Promise.reject(new Error("عکس بیشتر از یک مگابایت  میباشد "));
    if (!data.entery_year)
      return Promise.reject(new Error("سال ورود را وارد کنید "));
    if (!data.field_id) return Promise.reject(new Error(" رشته را وارد کنید "));
    if (!data.national_id)
      return Promise.reject(new Error(" کد ملی را وارد کنید "));
    if (!data.personal_id)
      return Promise.reject(new Error(" شماره پرسنلی را وارد کنید "));
    if (!data.phone)
      return Promise.reject(new Error(" شماره تلفن  را وارد کنید "));
    if (!data.first_name)
      return Promise.reject(new Error("  نام را وارد کنید "));
    if (!data.last_name)
      return Promise.reject(new Error(" نام  خانوادگی را وارد کنید "));
    if (data.role_ids.length == 0)
      return Promise.reject(new Error("حداقل دارای یک نقش میباشد "));
    return Promise.resolve();
  }
  const restFetch = (event) => {
    event.preventDefault();
    validation()
      .then(async () => {
        const dataForm = new FormData();
        for (let key in data) {
          if (key == "role_ids") {
            for (let value of data[key]) {
              dataForm.append(key, value);
            }
          } else if (key == "file") dataForm.append(key, data[key], "file");
          else dataForm.append(`${key}`, data[key]);
        }
        await fetch(`${config.REACT_APP_REST_API_URL}/user/insert/student`, {
          body: dataForm,
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.authInfo?.token}`,
          },
        })
          .then((e) => {
            toast.success("Done");
          })
          .catch((e) => {
            toast.error(e.message);
          });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <>
      <UserMenu active={"home"} />
      <DropBackComponent />
      <Div>
        <Form onSubmit={restFetch}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItem: "center",
              background: "linear-gradient(270deg, white, #3f77d1)",
              paddingTop: "64px",
              paddingLeft: "32px",
              paddingRight: "32px",
              marginBottom: "16px",
              // paddingRight: "20%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="تولد"
                inputFormat="MM/dd/yyyy"
                value={data.birthday}
                onChange={(value) => {
                  setData({ ...data, birthday: value });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <input
              type={"file"}
              onChange={(e) => {
                setData((prevData) => {
                  return {
                    ...prevData,
                    file: e.target.files[0],
                  };
                });
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(270deg, white, #3f77d1)",
              paddingTop: "64px",
            }}
          >
            <Autocomplete
              sx={{
                alignItems: "center",
                width: "50%",
                background: "linear-gradient(270deg, white, #3f77d1)",
              }}
              multiple
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
                setData((prevState) => {
                  return {
                    ...prevState,
                    role_ids: value.map((elem) => elem.id),
                  };
                });
                console.log(data);
              }}
            />
            <Autocomplete
              sx={{
                alignItems: "center",
                width: "50%",
                background: "linear-gradient(270deg, white, #3f77d1)",
              }}
              fullWidth
              id="tags-standard"
              options={fields}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="رشته"
                  placeholder="Fields"
                />
              )}
              onChange={(event, value) => {
                setData((prevState) => {
                  return {
                    ...prevState,
                    field_id: value.id,
                  };
                });
              }}
            />
          </div>
          <InputFormComponent
            formKey={"first_name"}
            setValue={setData}
            name={"نام "}
            type={"text"}
          />
          <InputFormComponent
            formKey={"last_name"}
            setValue={setData}
            name={"نام خانوادگی  "}
            type={"text"}
          />
          <InputFormComponent
            formKey={"phone"}
            setValue={setData}
            name={"شماره تماس  "}
            type={"text"}
          />
          <InputFormComponent
            formKey={"national_id"}
            setValue={setData}
            name={"شماره ملی  "}
            type={"text"}
          />
          <InputFormComponent
            formKey={"personal_id"}
            setValue={setData}
            name={"شماره سیستمی  "}
            type={"text"}
          />
          <InputFormComponent
            formKey={"entery_year"}
            setValue={setData}
            name={"سال ورود  "}
            type={"text"}
          />
          <Button type={"submit"}>تایید </Button>
        </Form>
      </Div>
    </>
  );
}
