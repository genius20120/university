import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 32px;
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 25px;
  @media (max-width: 280px) {
    width: 59px;
    height: 80px;
    font-size: 10px;
  }
  @media (max-width: 359px) and (min-width: 280px) {
    width: 93px;
    height: 50px;
    font-size: 11px;
  }
  @media (max-width: 400px) and (min-width: 359px) {
    width: 44.3%;
    font-size: 11px;
    height: 50px;
  }
  @media (max-width: 720px) and (min-width: 400px) {
    width: 200px;
    font-size: 12px;
    height: 45px;
  }
`;

export function UserDetailContainer({ name, value }) {
  return (
    <MainDiv>
      <label
        style={{
          paddingLeft: "2px",
        }}
      >
        :{name}
      </label>
      <label>{value}</label>
    </MainDiv>
  );
}
