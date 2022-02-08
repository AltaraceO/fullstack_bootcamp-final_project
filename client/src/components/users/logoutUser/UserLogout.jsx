import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { useHistory } from "react-router-dom";
import url from "../../../api/api";
import "../../NavBar/NavBar.css";

export const UserLogout = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [message, setMessage] = useState("");
  const history = useHistory();

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

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  return (
    <>
      <button className="main-button" onClick={onClickLogOut}>
        Logout
      </button>
      {message && <span>{message}</span>}
      {currentUser && ""}
    </>
  );
};
