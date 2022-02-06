import React, { useState } from "react";
import url from "../../../../api/api";

export const BookComments = ({ book, user }) => {
  const [comment, setComment] = useState("");

  const onHandleClick = async () => {
    console.log("the comment is", comment, user, book);
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
      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div>
      Comments:
      {book.comments.map((comm) => {
        return (
          <div key={comm._id}>
            <strong>{comm.author}</strong>: {comm.comment}
          </div>
        );
      })}
      <input type="text" onChange={(e) => setComment(e.target.value)} />
      <button onClick={onHandleClick}>Comment</button>{" "}
    </div>
  );
};
