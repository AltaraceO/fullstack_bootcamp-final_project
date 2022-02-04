import React from "react";

export const DisplayResults = ({ results }) => {
  return (
    <div>
      {results.map((book) => {
        return (
          <div key={book.isbn_13[0]}>
            <hr />
            <span>{book.title}</span>
            <br />
            <span>{book.author[0]}</span>
            <br />
            <img src={book.thumb} alt="book-cover" />
            <br />
            <span>{book.subtitle}</span>
          </div>
        );
      })}
    </div>
  );
};
