import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { BookComments } from "../bookComments/BookComments";

export const DisplayUserBooks = ({ results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  return (
    <>
      {results.map((book) => {
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
            <button>Like</button>
            <BookComments book={book} user={currentUser} />
          </div>
        );
      })}
    </>
  );
};
