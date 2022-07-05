import styled from "styled-components";
import { ImageComponent } from "../../components/image.component";
import { Button } from "../../Styles/button.style";
import { Label, UserInfoDiv } from "./style";
import { UserDetailContainer } from "./userDetailContainer";

const SkipDropBack = styled.div`
  width: 7%;
  height: 100%;
  @media (min-width: 400px) and (max-width: 720px) {
    width: 20%;
    height: 100%;
  }
  @media (max-width: 400px) {
    width: 15%;
    height: 100%;
  }
`;
export function UserDetails({ data, onClick, acceptedUser }) {
  const birthday = new Date(data.birthday);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        width: "100%",
        backgroundColor: "lightgray",
        borderBottom: "2px black solid",
      }}
    >
      {/* <SkipDropBack /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "81px",
        }}
      >
        <ImageComponent type={"profile"} image_url={data.photo} />
      </div>
      <UserInfoDiv>
        <UserDetailContainer value={data.first_name} name={" نام  "} />
        <UserDetailContainer value={data.last_name} name={" نام خانوادگی  "} />
        <UserDetailContainer value={data.phone} name={" شماره تلفن   "} />
        <UserDetailContainer value={data.national_id} name={" کد ملی  "} />
        <UserDetailContainer
          value={data.personal_id}
          name={" شماره دانشجویی   "}
        />
        <UserDetailContainer
          value={`${birthday.getDate()}/${birthday.getMonth()}/${birthday.getFullYear()}`}
          name={" تاریخ تولد   "}
        />
        <UserDetailContainer value={data.entery_year} name={" سال ورود   "} />
        <UserDetailContainer value={data.field.name} name={" رشته   "} />
      </UserInfoDiv>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "8px",
          width: "64px",
        }}
      >
        <Button onClick={() => onClick(data.id)}>تایید دانشجو </Button>
      </div>
    </div>
  );
}
