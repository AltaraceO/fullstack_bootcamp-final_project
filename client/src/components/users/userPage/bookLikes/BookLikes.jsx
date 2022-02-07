// import { urlencoded } from "express";
import React, { useEffect, useState } from "react";
import url from "../../../../api/api";
import { ErrorMessage } from "../../../messages/ErrorMessage";

export const BookLikes = ({ book, user }) => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const onHandleLike = async () => {
    try {
      const { data } = await url.post("/books/like", book, config);
      console.log(data);
    } catch (err) {
      console.log(err.response);
      setError(err.response.data);
    }
  };

  // useEffect(() => {
  //   const checkLike = async () => {
  //     const { data } = await url.get("/books/checkLikes", book, config);
  //     console.log("started");
  //   };
  // }, []);

  return (
    <>
      <button onClick={onHandleLike} disabled={isActive}>
        Like
      </button>
      {error && <ErrorMessage msg={error} />}
    </>
  );
};
