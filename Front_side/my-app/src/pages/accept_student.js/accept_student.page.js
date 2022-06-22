import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DropBackComponent } from "../../components/dropBack.component";
import { UserMenu } from "../../components/userMenu.compnent";
import { config } from "../../config/config";
import { Rest } from "../../utils/rest-api";
import { UserDetails } from "./userDetail.component";

export function AcceptStudentPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const size = 5;
  useEffect(() => {
    Rest.req({
      url: `/user/notActive/getAll/${page}/${size}`,
      method: "GET",
    })
      .then((res) => {
        setUsers((prv) => {
          return [...prv, ...res.user];
        });
        console.log(users);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);
  const userInfo =
    users.length != 0 ? (
      users.map((info) => <UserDetails key={info.id} data={info} />)
    ) : (
      <></>
    );
  return (
    <>
      <UserMenu active={"home"} />
      <DropBackComponent />
      <div>{userInfo}</div>
    </>
  );
}
