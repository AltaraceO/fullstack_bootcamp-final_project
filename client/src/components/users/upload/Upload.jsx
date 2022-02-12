import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";

export const Upload = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];

  const history = useHistory();

  const handleUploadFile = async (event) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const data = new FormData();
    data.append("avatar", event.target.files[0]);
    // data.append("name", "some value user types");
    // data.append("description", "some value user types");

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
      <input type="file" onChange={handleUploadFile} />
    </div>
  );
};
