import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserLogout } from "../users/logoutUser/UserLogout";
export const NavBar = () => {
  const [currentUser] = useContext(UserContext)["user"];
  return (
    <div className="nav-bar">
      <Link className="main-button" to="/">
        Home
      </Link>
      {!currentUser && (
        <Link className="main-button" to="/registration">
          Login
        </Link>
      )}

      {currentUser && (
        <Link className="main-button main-button-user" to="/user-page">
          Welcome {currentUser.name}
        </Link>
      )}
      <Link className="main-button" to="/search-subject">
        Search by Subject
      </Link>

      {currentUser && <UserLogout />}
    </div>
  );
};
