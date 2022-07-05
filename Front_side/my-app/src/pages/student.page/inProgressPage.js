import styled from "styled-components";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { ProjectReportList } from "../PagesComponent/projectReportList";
import { FinishButton } from "./finishButtton";
import { InsertReport } from "./inserting_report";

export function InprogressPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "72px",
        paddingRight: "10%",
        overflow: "auto",
        paddingBottom: "9%",
        backgroundColor: "azure",
      }}
    >
      <FinishButton />
      <div
        style={{
          height: "100%",
          width: "90%",
          paddingLeft: "10%",
        }}
      >
        <InsertReport />
      </div>

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          : گزارش های پیشین{" "}
        </div>
        <ProjectReportList type={"student"} />
      </div>
    </div>
  );
}
