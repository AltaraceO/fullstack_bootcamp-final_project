// import React, { useContext, useEffect, useState } from "react";
import React from "react";
// import { UserContext } from "../../../UserContext";
// import { BookComments } from "../bookComments/BookComments";
// import { BookLikes } from "../bookLikes/BookLikes";
// import { RemoveBook } from "../removeBook/RemoveBook";
// import { Read } from "../read/Read";
import "./book-details.css";

//took out the FUNK in the prop spread
export const BookDetails = ({ details }) => {
  // const [currentUser] = useContext(UserContext)["user"];
  // const [bookInfo, setBookInfo] = useState("");
  // console.log(currentUser);

  // useEffect(() => {
  //   setBookInfo(details);
  // }, [details]);

  return (
    <div>
      BookDetaiills
      {/* {bookInfo && <div>{bookInfo.title}</div>} */}
      {/* <div className="book-detail-display">
        <h3>{bookInfo.title}</h3>
        {/* <h5>{bookInfo.authors}</h5> */}
      {/* <img src={details.thumb} alt="cover" /> */}
      {/* <div className="comment-section">
          <BookComments book={details} user={currentUser} />
        </div> */}
      {/* <RemoveBook func={func} book={details} /> */}
      {/* <BookLikes book={details} /> */}
      {/* <Read book={details} /> */}
      {/* </div> */}
    </div>
  );
};
