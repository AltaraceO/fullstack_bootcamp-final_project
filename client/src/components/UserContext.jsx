import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <UserContext.Provider value={{ user: [currentUser, setCurrentUser] }}>
      {props.children}
    </UserContext.Provider>
  );
};
