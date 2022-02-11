import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { BookComments } from "../bookComments/BookComments";
import { BookLikes } from "../bookLikes/BookLikes";
import { RemoveBook } from "../removeBook/RemoveBook";
import { Read } from "../read/Read";
import "./book-details.css";

export const BookDetails = ({ func, details }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [bookInfo, setBookInfo] = useState("");
  // console.log(currentUser);

  useEffect(() => {
    setBookInfo(details);
  }, [details]);

  return (
    <div>
      <div className="book-detail-display">
        <h3>{bookInfo.title}</h3>
        <h5>{bookInfo.authors}</h5>
        <img src={bookInfo.thumb} alt="cover" />
        <div className="comment-section">
          <BookComments book={bookInfo} user={currentUser} />
        </div>
      </div>

      <RemoveBook func={func} book={details} />
      <BookLikes book={details} />
      <Read book={details} />
    </div>
  );
};
