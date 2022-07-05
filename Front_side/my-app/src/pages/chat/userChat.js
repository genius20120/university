import styled from "styled-components";

const MainDiv = styled.div`
  margin-top: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 99.2%;
  background: linear-gradient(270deg, white, lightgray);
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  border-bottom-left-radius: 12px;
`;
const ProfileImge = styled.img`
  border-radius: 50%;
  height: 38px;
  width: 38px;
`;
const Label = styled.label`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  @media (max-width: 720px) {
    font-size: 15px;
  }
`;
const IsSeenDiv = styled.div`
  width: 100px;
  background-color: #d12a4b;
  color: white;
  text-align: right;
  height: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  font-size: 14px;

  @media (max-width: 720px) and (min-width: 300px) {
    width: 80px;
    font-size: 10px;
  }
  @media (max-width: 300px) {
    width: 70px;
    font-size: 8px;
  }
`;

export function UserChat({
  room_id,
  photo,
  id,
  first_name,
  last_name,
  isSeen,
  onClick,
}) {
  return (
    <MainDiv onClick={() => onClick(id, room_id)}>
      <div
        style={{
          width: "32px",
          height: "36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "16px",
          paddingRight: "12px",
        }}
      >
        <ProfileImge src={photo ? photo : "/unknown_avatar.jpeg"} />
      </div>
      <div
        style={{
          width: "100%",
          paddingTop: "10px",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-evently",
          alignItems: "center",
        }}
      >
        <Label> {first_name}</Label>
        <Label> {last_name}</Label>
      </div>
      {isSeen || <IsSeenDiv>خوانده نشده</IsSeenDiv>}
    </MainDiv>
  );
}
