// import { urlencoded } from "express";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import url from "../../../../api/api";
import { ErrorMessage } from "../../../messages/ErrorMessage";

export const Read = ({ book }) => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [isRead, setIsRead] = useState(false);
  const [isUnRead, setIsUnRead] = useState(false);
  const [error, setError] = useState("");
  const checkmark = "✔";

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const onHandleNotRead = async () => {
    try {
      await url.post("/books/notRead", book, config);
      const userNotRead = await url.post("/users/notReadBook", book, config);
      setCurrentUser(userNotRead.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const onHandleRead = async () => {
    try {
      await url.post("/books/read", book, config);
      const userRead = await url.post("/users/readBook", book, config);
      setCurrentUser(userRead.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setIsRead(false);
    setIsUnRead(false);
    const currentBook = currentUser.books.find((b) => b._id === book._id);
    currentBook?.read ? setIsRead(true) : setIsUnRead(true);
  }, [book._id, currentUser]);

  return (
    <>
      {isUnRead && (
        <button className="reg-button" onClick={onHandleRead}>
          Have you read this book?
        </button>
      )}
      {isRead && (
        <button className="reg-button" onClick={onHandleNotRead}>
          Read {checkmark}{" "}
        </button>
      )}

      {error && <ErrorMessage msg={error} />}
    </>
  );
};
