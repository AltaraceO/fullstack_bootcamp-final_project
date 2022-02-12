import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { DeleteAccount } from "../deleteAccount/DeleteAccount";
import "./upload.css";

export const Upload = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [sure, setSure] = useState(false);

  const history = useHistory();

  const handleUploadFile = async (event) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const data = new FormData();
    data.append("avatar", event.target.files[0]);

    const userBack = await url.post("users/avatar", data, config);
    console.log(userBack.data);
    setCurrentUser(userBack.data);
  };

  useEffect(() => {
    if (!currentUser) {
      history.push("/registration");
    }
  }, [currentUser, history]);

  return (
    <div>
      <div>
        <label className="upload-button">
          <input type="file" onChange={handleUploadFile} />
          Upload profile picture
        </label>
      </div>
      <br />
      <button className="upload-button" onClick={() => setSure(true)}>
        Delete Account
      </button>
      {sure && <DeleteAccount />}
    </div>
  );
};
