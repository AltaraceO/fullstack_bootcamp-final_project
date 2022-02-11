import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { BookComments } from "../bookComments/BookComments";
import { BookLikes } from "../bookLikes/BookLikes";
import { RemoveBook } from "../removeBook/RemoveBook";
import { Read } from "../read/Read";
import "./book-details.css";

export const BookDetails = ({ likeFunc, func, details }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [bookInfo, setBookInfo] = useState("");

  useEffect(() => {
    setBookInfo(details);
  }, [details]);

  return (
    <div>
      <div className="book-detail-display">
        <h3>{bookInfo.title}</h3>
        <h5>{bookInfo.authors}</h5>
        <img src={bookInfo.thumb} alt="cover" />
        <span>{bookInfo.likes?.length}</span>
        <div className="comment-section">
          <BookComments book={bookInfo} user={currentUser} />
        </div>
      </div>

      <RemoveBook func={func} book={details} />
      <BookLikes likeFunc={likeFunc} book={details} />
      <Read book={details} />
    </div>
  );
};
