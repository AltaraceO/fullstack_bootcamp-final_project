import React from "react";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <span>|</span>
      <Link to="/newUser">New User</Link>
      <span>|</span>
      <Link to="/search">Book Search</Link>
    </div>
  );
};
