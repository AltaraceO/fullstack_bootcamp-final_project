import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";

export const UserLogout = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [message, setMessage] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const onClickLogOut = async () => {
    try {
      await url.post("/users/logoutAll", {}, config);
      localStorage.removeItem("authToken");
      setCurrentUser("");
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  return (
    <>
      <button onClick={onClickLogOut}>LogOut</button>
      {message && <span>{message}</span>}
      {currentUser && ""}
    </>
  );
};
