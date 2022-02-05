import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { AddBooks } from "../addBooks/AddBooks";

export const DisplayResults = ({ results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  return (
    <>
      {results.map((book) => {
        return (
          <div key={book.isbn_13[0]}>
            <hr />
            <span>{book.title}</span>
            <br />
            <span>{book.authors[0]}</span>
            <br />
            <img src={book.thumb} alt="book-cover" />
            <br />
            <span>{book.subtitle}</span>
            {currentUser && <AddBooks book={book} />}
          </div>
        );
      })}
    </>
  );
};
