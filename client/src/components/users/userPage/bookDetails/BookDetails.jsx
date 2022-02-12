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
    <>
      <div className=" comment-section">
        <div className="book-detail-container">
          <div>
            <BookComments book={bookInfo} user={currentUser} />
          </div>
          <div className="book-detail-display">
            {console.log(bookInfo)}
            <h3>{bookInfo.title}</h3>
            <h5>{bookInfo.authors}</h5>
            <img src={bookInfo.thumb} alt="cover" />
            <div className="link-like">
              <a href={bookInfo.url}>Link</a>
              {bookInfo.likes?.length > 0 && (
                <span>
                  | Likes- <strong> {bookInfo.likes?.length}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="book-buttons">
          <div className="first-two-buttons">
            <BookLikes likeFunc={likeFunc} book={details} />
            <Read book={details} />
          </div>
          <RemoveBook func={func} book={details} />
        </div>
      </div>
    </>
  );
};
