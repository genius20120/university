import styled from "styled-components";

export const MainDiv = styled.div`
  background-color: "white";
  position: fixed;
  bottom: 0;
  left: 25%;
  z-index: 2;
  width: 50%;
  height: 35px;
  border-radius: 20px;
  border: 1px solid gray;
  @media (max-width: 720px) {
    width: 100%;
    left: 0;
  }
`;
export const Image = styled.img`
  background-color: ${({ active }) => (active ? "#186ea3" : "white")};
  height: 90%;
  width: 90%;
  border-radius: 20px;
  border-left-width: ${({ hasBorder }) => (hasBorder ? "0.5px" : 0)};
  border-right-width: ${({ hasBorder }) => (hasBorder ? "0.5px" : 0)};
  transition: margin 0.5s;
  &:hover {
    margin-bottom: 10px;
  }
`;
