import React from "react";
import url from "../../../api/api";

export const Upload = () => {
  const handleUploadFile = (event) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const data = new FormData();
    data.append("avatar", event.target.files[0]);
    // data.append("name", "some value user types");
    // data.append("description", "some value user types");

    url.post("users/avatar", data, config);
  };
  return (
    <div>
      <input type="file" onChange={handleUploadFile} />
    </div>
  );
};
