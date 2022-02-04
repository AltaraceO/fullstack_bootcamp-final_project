import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
export const NavBar = () => {
  const [currentUser] = useContext(UserContext)["user"];
  return (
    <div>
      <Link to="/"> Home </Link>
      <span>|</span>
      <Link to="/newUser"> New User </Link>
      <span>|</span>
      <Link to="/userLogin"> Login User </Link>
      <span>|</span>
      <Link to="/search-subject"> Search by Subject </Link>
      <span>|</span>
      <Link to="/search-book"> Book Search </Link>
      <span>|</span>
      {currentUser && <span>Welcome {currentUser.name}</span>}
    </div>
  );
};
