import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { AddBooks } from "../addBooks/AddBooks";
import url from "../../../api/api";

export const DisplayResults = ({ results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [sortedBooks, setSortedBooks] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
  };

  const getSortedBooks = async () => {
    results.map(async (book) => {
      const bookCheck = await url.post("/books/checkBooks", book);
      console.log(bookCheck);
      return bookCheck;
    });
  };

  useEffect(() => {
    const checkLocalBooks = async () => {
      const books = await getSortedBooks();
      // setSortedBooks(books);
      console.log(books);
    };
    checkLocalBooks();
  });
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
            {currentUser && <AddBooks book={book} />}
          </div>
        );
      })}
    </>
  );
};
