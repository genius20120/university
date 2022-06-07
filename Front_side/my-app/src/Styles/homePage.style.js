import styled from "styled-components";

export const RootDivHomePage = styled.div`
  background-color: azure;
  width: 100%;
  height: 100%;
  display: flex;
`;
export const PublicNavContainerDiv = styled.div`
  overflow: auto;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 40%;
  height: 100%;
  padding-top: 16px;
  @media (max-width: 360px) {
    width: 45%;
  }
  @media (max-width: 200px) {
    width: 55%;
  }
`;
export const BackDrop = styled.div`
  background-color: #33435c;
  opacity: 0.7;
  width: ${({ active }) => (active ? "60%" : "50%")};
  height: 100%;
`;

export const PublicNavContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1101;
  top: 0;
  left: ${({ active }) => (active ? 0 : "90%")};
  display: flex;
  flex-direction: row-reverse;
`;
export const PublicNavOpener = styled.div`
  background-color: azure;
  height: 100%;
  width: 10%;
  opacity: 0.8;
  display: ${({ active }) => (active ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ActionMenu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;
export const RoleSelect = styled.select`
  width: 70%;
  margin: 0;
  direction: rtl;
`;
export const RoleItem = styled.option`
  background-color: #fff;
  border-right: 2px solid #000;
  margin-top: 8px;
  padding: 12px;
  &:hover {
    background-color: #7393b3;
  }
`;
