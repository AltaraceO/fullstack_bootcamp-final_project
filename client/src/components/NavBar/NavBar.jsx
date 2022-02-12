import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserLogout } from "../users/logoutUser/UserLogout";
import { Image } from "../users/image/Image";
export const NavBar = () => {
  const [currentUser] = useContext(UserContext)["user"];
  return (
    <div className="nav-bar">
      <div className="main-three">
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
          Search
        </Link>
      </div>

      <div className="user-buttons">
        {currentUser && (
          <>
            <UserLogout />
            <div>
              <Link to="/change-image">
                <Image />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
