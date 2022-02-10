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
      await url.post("/books/unlike", book, config);
      const userUnLike = await url.post("/users/unLikeBook", book, config);
      setCurrentUser(userUnLike.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const onHandleLike = async () => {
    try {
      await url.post("/books/like", book, config);
      const userLike = await url.post("/users/likeBook", book, config);
      setCurrentUser(userLike.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response.data);
    }
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     return;
  //   }
  //   setIsLiked(false);
  //   setIsUnLiked(false);
  //   const currentBook = currentUser.books.find((b) => b._id === book._id);
  //   currentBook?.like ? setIsLiked(true) : setIsUnLiked(true);
  // }, [book._id, currentUser]);

  return (
    <>
      {isUnLiked && (
        <button className="reg-button" onClick={onHandleLike}>
          Like
        </button>
      )}
      {isLiked && (
        <button className="reg-button" onClick={onHandleUnLike}>
          Unlike
        </button>
      )}

      {error && <ErrorMessage msg={error} />}
    </>
  );
};
