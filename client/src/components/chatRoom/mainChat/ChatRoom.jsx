import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "../../UserContext";

export const ChatRoom = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const [room] = useState("boom");

  useEffect(() => {}, []);

  const connectToRoom = () => {
    console.log(room);
  };
  return (
    <div>
      {currentUser && <h1>You are logged in </h1>}
      <button onClick={connectToRoom}>Connect to room</button>
    </div>
  );
};
