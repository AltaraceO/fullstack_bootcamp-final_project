import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { AddBooks } from "../addBooks/AddBooks";
import url from "../../../api/api";
import { DisplayComments } from "../../comments/displayComments/DisplayComments";
import "../bySubject/subject-api.css";

export const DisplayResults = ({ results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [sortedBooks, setSortedBooks] = useState("");

  useEffect(() => {
    const getSortedBooks = async () => {
      const allBooks = await Promise.all(
        results.map(async (book) => {
          const bookCheck = await url.post("/books/checkBooks", book);
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
    <div className="results-main-container">
      {sortedBooks &&
        sortedBooks.map((book) => {
          return (
            <div className="search-book-card" key={book.isbn_13}>
              <div className="card-book-info">
                <h3> {book.title.substring(0, 30)}</h3>
                <h5>{book.authors[0]}</h5>
                <img src={book.thumb} alt="book-cover" />
                <h6>{book.subtitle}</h6>
                {book.likes?.length > 0 && <h6>{book.likes?.length} 👍</h6>}
                {book.comments?.length > 0 && (
                  <DisplayComments comments={book.comments} />
                )}
              </div>

              {currentUser && <AddBooks book={book} />}
            </div>
          );
        })}
    </div>
  );
};
