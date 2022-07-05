import styled from "styled-components";

const Button = styled.button`
  background-color: green;
  font-size: 22px;
  border-radius: 15px;
`;
export function FinishButton() {
  return (
    <div
      style={{
        height: "72px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button>اتمام فرایند و ارسال برای تعیین جلسه دفاع </Button>
    </div>
  );
}
