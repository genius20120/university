import { MainDiv } from "./style";

export function WaitingPage({ status }) {
  return (
    <MainDiv>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "25%",
            border: "2px black solid",
            borderRadius: "25px",
            padding: "24px",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          پروژه شما در حال انتظار برای تایید استاد راهنما میباشد{" "}
        </div>
        {(() => {
          if (status === "in_progress")
            return (
              <div
                style={{
                  width: "80%",
                  height: "25%",
                  border: "2px black solid",
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                پروژه شما در انتظار برای تایید مدیر گروه میباشد
              </div>
            );
        })()}
      </div>
    </MainDiv>
  );
}
