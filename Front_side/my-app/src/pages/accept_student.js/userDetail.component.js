import { ImageComponent } from "../../components/image.component";
import { Label, UserInfoDiv } from "./style";

export function UserDetails({ data }) {
  return (
    <UserInfoDiv>
      <ImageComponent type={"profile"} image_url={data.photo} />
      <Label>first_name</Label>
      <Label>{data.first_name}</Label>
      <Label>last_name</Label>
      <Label>{data.last_name}</Label>
      <Label>phone</Label>
      <Label>{data.phone}</Label>
      <Label>national_id</Label>
      <Label>{data.national_id}</Label>
      <Label>personal_id</Label>
      <Label>{data.personal_id}</Label>
      <Label>birthday</Label>
      <Label>{data.birthday}</Label>
      <Label>entery_year</Label>
      <Label>{data.entery_year}</Label>
      <Label>field</Label>
      <Label>{data.field.name}</Label>
    </UserInfoDiv>
  );
}
