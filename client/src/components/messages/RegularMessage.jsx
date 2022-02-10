import React, { useState, useEffect } from "react";

export const RegularMessage = ({ message }) => {
  const [displayMessage, setDisplayMessage] = useState(null);
  useEffect(() => {
    if (message) {
      setDisplayMessage(message);
    }
  }, [message]);

  return <div>{displayMessage}</div>;
};
