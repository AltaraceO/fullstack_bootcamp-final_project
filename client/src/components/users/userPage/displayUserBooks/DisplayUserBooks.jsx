import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../../UserContext";
// import { BookComments } from "../bookComments/BookComments";
// import { BookLikes } from "../bookLikes/BookLikes";
// import { RemoveBook } from "../removeBook/RemoveBook";
// import { Read } from "../read/Read";
import "./display-user-books.css";
// import { LoggerLevel } from "mongoose/node_modules/mongodb";

export const DisplayUserBooks = ({ func, results }) => {
  const [currentUser] = useContext(UserContext)["user"];
  const [userBooks, setUserBooks] = useState("");

  const listRef = useRef(null);

  const scroll = (direction) => {
    const d = direction;
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: d === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const sendIndividualBookDetail = (book) => {
    func(book);
  };

  useEffect(() => {
    setUserBooks(results);
  }, [results]);

  // const bookRemovedReRender = (newBookList) => {
  //   setUserBooks(newBookList);
  // };
  console.log(currentUser);
  return (
    <>
      <div className="carousel-container">
        <div className="carousel-arrow" onClick={() => scroll("left")}>
          {"<"}
        </div>
        <div className="carousel" ref={listRef}>
          {userBooks &&
            userBooks.map((book) => {
              return (
                <div className="carousel-book" key={book.isbn_13}>
                  <img
                    className="small-thumb"
                    onClick={() => sendIndividualBookDetail(book)}
                    src={book.small_thumb}
                    alt="book-cover"
                  />
                  <span>{book.title.substring(0, 30)}</span>
                  {/* {book.likes.length} */}
                  {/* <span>{book.subtitle}</span> */}
                  {/* <RemoveBook book={book} func={bookRemovedReRender} /> */}
                  {/* <BookLikes book={book} /> */}
                  {/* <Read book={book} /> */}
                  {/* <BookComments book={book} user={currentUser} /> */}
                </div>
              );
            })}
        </div>
        <div className="carousel-arrow" onClick={() => scroll("right")}>
          {">"}
        </div>
      </div>
    </>
  );
};
