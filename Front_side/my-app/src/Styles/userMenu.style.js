import styled from "styled-components";

export const MainDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 25%;
  z-index: 2;
  width: 50%;
  height: 50px;
  @media (max-width: 720px) {
    width: 100%;
    left: 0;
  }
`;
export const Image = styled.img`
  background-color: ${({ active }) => (active ? "#324fdb" : "white")};
  height: 100%;
  width: 100%;

  border-left: 0 solid black;
  border-right: 0 solid black;
  border-left-width: ${({ hasBorder }) => (hasBorder ? "2px" : 0)};
  border-right-width: ${({ hasBorder }) => (hasBorder ? "2px" : 0)};
  transition: margin 0.5s;
  &:hover {
    margin-bottom: 20px;
  }
`;
