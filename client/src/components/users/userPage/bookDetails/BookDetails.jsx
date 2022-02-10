import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
// import { BookComments } from "../bookComments/BookComments";
// import { BookLikes } from "../bookLikes/BookLikes";
// import { RemoveBook } from "../removeBook/RemoveBook";
// import { Read } from "../read/Read";
import "./book-details.css";

//took out the FUNK in the prop spread
export const BookDetails = ({ details }) => {
  const [currentUser] = useContext(UserContext)["user"];
  console.log(currentUser);
  return (
    <div>
      <div className="book-detail-display">
        <h3>{details.title}</h3>
        <h5>{details.authors}</h5>
        {/* <img src={details.thumb} alt="cover" /> */}
        {/* <div className="comment-section">
          <BookComments book={details} user={currentUser} />
        </div> */}
        {/* <RemoveBook func={func} book={details} /> */}
        {/* <BookLikes book={details} /> */}
        {/* <Read book={details} /> */}
      </div>
    </div>
  );
};
