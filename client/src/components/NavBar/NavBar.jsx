import React from "react";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div>
      <Link to="/"> Home </Link>
      <span>|</span>
      <Link to="/newUser"> New User </Link>
      <span>|</span>
      <Link to="/search-subject"> Search by Subject </Link>
      <span>|</span>
      <Link to="/search-book"> Book Search </Link>
    </div>
  );
};
