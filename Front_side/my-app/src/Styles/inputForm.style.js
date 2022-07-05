import styled from "styled-components";

export const MainDiv = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row-reverse;
  /* background: linear-gradient(270deg, white, #3f77d1); */
  padding-top: 16px;
  margin-top: 12px;
`;
export const Label = styled.label`
  width: 128px;
  display: block;
  text-align: right;
  margin: 16px;
  padding-right: 10%;
  @media screen and (min-width: 720px) {
    padding-right: 5%;
  }
`;
export const Input = styled.input`
  height: 60%;
  width: 60%;
  display: block;
  text-align: right;
  transition: 0.5s;
  border-radius: 12px;
  &:focus {
    transform: scale(1.2);
  }
`;
export const TextArea = styled.textarea`
  height: 90%;
  width: 55%;
  text-align: right;
`;
