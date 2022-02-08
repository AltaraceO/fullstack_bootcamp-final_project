import React, { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { useHistory } from "react-router-dom";
import { NewUser } from "../newUser/NewUser";
import { UserLogin } from "../loginUser/UserLogin";
import "./registration.css";

export const Registration = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("/user-page");
    }
  }, [currentUser, history]);

  return (
    <div className="register-container">
      Register -
      <NewUser />
      Or, login
      <UserLogin />
    </div>
  );
};
