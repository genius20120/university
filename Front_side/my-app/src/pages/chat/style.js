import styled from "styled-components";

export const SearchDiv = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  @media (max-width: 720px) {
    flex-wrap: wrap;
  }
`;
export const SearchInput = styled.input`
  width: 38%;
  height: 20px;
  background-color: lightgray;
  text-align: right;
  @media (max-width: 720px) {
    width: 110px;
  }
`;
export const Label = styled.label`
  margin-left: 8px;
  font-size: 12px;
  @media (max-width: 720px) {
    font-size: 10px;
    @media (max-width: 720px) and (min-width: 320px) {
      font-size: 14px;
    }
  }
`;
export const Button = styled.button`
  height: 25px;
  margin-top: 12px;
  @media (max-width: 720px) {
    width: 65%;
  }
`;
export const FieldDiv = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    width: 85%;
    margin-top: 16px;
    justify-content: space-between;
  }
`;
