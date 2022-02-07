import React, { useEffect, useState } from "react";

export const ErrorMessage = ({ msg }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, []);
  console.log(msg);
  return <>{message}</>;
};
