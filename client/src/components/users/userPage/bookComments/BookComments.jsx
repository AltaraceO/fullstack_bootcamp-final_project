import React, { useState, useEffect } from "react";
import url from "../../../../api/api";

export const BookComments = ({ book, user }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");

  const onHandleClick = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const commentObj = {
      author: user.name,
      book,
      comment,
    };
    try {
      const { data } = await url.post("/books/comment", commentObj, config);
      setComments(data.comments);
      setComment("");
    } catch (err) {
      console.log(err.response);
    }
  };

  // useEffect(() => {
  //   setComments(book.comments);
  // }, [setComment, book.comments]);

  return (
    <>
      Comments:
      {comments &&
        comments.map((comm) => {
          return (
            <div key={comm._id}>
              <strong>{comm.author}</strong>: {comm.comment}
            </div>
          );
        })}
      <textarea
        rows="5"
        cols="50"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="reg-button" onClick={onHandleClick}>
        Comment
      </button>{" "}
    </>
  );
};
