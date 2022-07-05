import { UserMenu } from "../components/userMenu.compnent";
import { ProjectListComponent } from "./PagesComponent/projectList.component";

const data = [
  {
    student: {
      first_name: "ماهان ",
      last_name: "مسائلی ",
      photo: null,
      national_id: "231465",
    },
    status: "in_progress",
    id: 1,
  },
  {
    student: {
      first_name: "ماهان ",
      last_name: "مسائلی ",
      national_id: "231465",
      photo: null,
    },
    status: "in_progress",
    id: 2,
  },
];

export function SettingPage() {
  return (
    <div>
      <UserMenu />
      <ProjectListComponent list={data} />
    </div>
  );
}
