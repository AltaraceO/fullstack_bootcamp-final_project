import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../UserContext";
import { BookComments } from "../bookComments/BookComments";
import { BookLikes } from "../bookLikes/BookLikes";
import { RemoveBook } from "../removeBook/RemoveBook";
import { Read } from "../read/Read";
import "./display-user-books.css";

export const DisplayUserBooks = ({ func, results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [userBooks, setUserBooks] = useState("");

  const sendIndividualBookDetail = (book) => {
    func(book);
  };

  useEffect(() => {
    setUserBooks(results);
  }, [results]);

  const bookRemovedReRender = (newBookList) => {
    setUserBooks(newBookList);
  };
  return (
    <div className="carousel">
      {userBooks &&
        userBooks.map((book) => {
          return (
            <div key={book.isbn_13}>
              <hr />
              <span>{book.title.substring(0, 30)}</span>
              <br />
              {/* <span>{book.authors[0]}</span> */}
              <br />
              <img
                onClick={() => sendIndividualBookDetail(book)}
                src={book.thumb}
                alt="book-cover"
              />
              {book.likes.length}
              <br />
              {/* <span>{book.subtitle}</span> */}
              {/* <RemoveBook book={book} func={bookRemovedReRender} /> */}
              {/* <BookLikes book={book} /> */}
              {/* <Read book={book} /> */}
              {/* <BookComments book={book} user={currentUser} /> */}
            </div>
          );
        })}
    </div>
  );
};
