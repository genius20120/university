import { useState } from "react";

export function InsertUserPage() {
  const [data, setData] = useState({
    file: null,
    name: "dfff",
    array: [1, 2],
  });
  return (
    <div>
      <input
        type={"file"}
        onChange={(e) => {
          setData((prevState) => {
            return { ...prevState, file: e.target.files[0] };
          });
        }}
      ></input>
      <input type={"text"}></input>
      <button
        onClick={() => {
          const formData = new FormData();
          formData.append("file", data.file);
          formData.append("name", data.name);
        }}
      >
        click
      </button>
    </div>
  );
}
