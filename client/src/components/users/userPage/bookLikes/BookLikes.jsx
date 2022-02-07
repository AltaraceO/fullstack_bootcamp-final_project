// import { urlencoded } from "express";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../UserContext";
import url from "../../../../api/api";
import { ErrorMessage } from "../../../messages/ErrorMessage";

export const BookLikes = ({ book }) => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [isLiked, setIsLiked] = useState(false);
  const [isUnLiked, setIsUnLiked] = useState(false);
  const [error, setError] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const onHandleUnLike = async () => {
    try {
      const { data } = await url.post("/books/unlike", book, config);
      const userUnLike = await url.post("/users/unLikeBook", book, config);
      console.log(userUnLike.data);
      console.log(currentUser);
      setCurrentUser(userUnLike.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const onHandleLike = async () => {
    try {
      await url.post("/books/like", book, config);
      const userLike = await url.post("/users/likeBook", book, config);

      console.log("like", userLike.data, currentUser);
      setCurrentUser(userLike.data);
    } catch (err) {
      console.log(err.response);
      // setError(err.response.data);
    }
  };

  useEffect(() => {
    setIsLiked(false);
    setIsUnLiked(false);
    const currentBook = currentUser.books.find((b) => b._id === book._id);

    console.log(currentBook?.like);
    currentBook?.like ? setIsLiked(true) : setIsUnLiked(true);
  }, [book._id, currentUser]);

  return (
    <>
      {isUnLiked && <button onClick={onHandleLike}>Like</button>}
      {isLiked && <button onClick={onHandleUnLike}>Unlike</button>}

      {error && <ErrorMessage msg={error} />}
    </>
  );
};
