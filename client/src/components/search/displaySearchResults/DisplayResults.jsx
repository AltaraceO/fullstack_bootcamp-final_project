import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { AddBooks } from "../addBooks/AddBooks";
import url from "../../../api/api";
import { DisplayComments } from "../../comments/displayComments/DisplayComments";

export const DisplayResults = ({ results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [sortedBooks, setSortedBooks] = useState("");

  useEffect(() => {
    const getSortedBooks = async () => {
      const allBooks = await Promise.all(
        results.map(async (book) => {
          const bookCheck = await url.post("/books/checkBooks", book);
          console.log(bookCheck.data);
          return bookCheck.data;
        })
      );
      return allBooks;
    };
    const checkLocalBooks = async () => {
      const books = await getSortedBooks();
      setSortedBooks(books);
    };
    checkLocalBooks();
  }, [results]);

  return (
    <>
      {sortedBooks &&
        sortedBooks.map((book) => {
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
              {book.comments?.length > 0 && (
                <DisplayComments comments={book.comments} />
              )}
              {currentUser && <AddBooks book={book} />}
            </div>
          );
        })}
    </>
  );
};
