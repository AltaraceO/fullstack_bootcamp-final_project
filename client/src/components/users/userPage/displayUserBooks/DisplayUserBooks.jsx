import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import { BookComments } from "../bookComments/BookComments";
import { BookLikes } from "../bookLikes/BookLikes";
import { RemoveBook } from "../removeBook/RemoveBook";

export const DisplayUserBooks = ({ results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [userBooks, setUserBooks] = useState("");

  useEffect(() => {
    setUserBooks(results);
  }, [results]);

  const bookRemovedReRender = (newBookList) => {
    setUserBooks(newBookList);
  };
  return (
    <>
      {userBooks &&
        userBooks.map((book) => {
          return (
            <div key={book.isbn_13}>
              <hr />
              <span>{book.title}</span>
              <br />
              <span>{book.authors[0]}</span>
              <br />
              <img src={book.thumb} alt="book-cover" />
              <br />
              <span>{book.subtitle}</span>
              <RemoveBook book={book} func={bookRemovedReRender} />
              <BookLikes book={book} />
              <BookComments book={book} user={currentUser} />
            </div>
          );
        })}
    </>
  );
};
