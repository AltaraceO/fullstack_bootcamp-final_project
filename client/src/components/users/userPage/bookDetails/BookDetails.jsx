import React, { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { BookComments } from "../bookComments/BookComments";
import { BookLikes } from "../bookLikes/BookLikes";
import { RemoveBook } from "../removeBook/RemoveBook";
import { Read } from "../read/Read";

export const BookDetails = ({ details }) => {
  const [currentUser] = useContext(UserContext)["user"];
  console.log(details);
  return (
    <div>
      <div>
        <span>{details.subtitle}</span>
        <span>{details.authors}</span>
        <RemoveBook book={details} />
        <BookLikes book={details} />
        <Read book={details} />
        <BookComments book={details} user={currentUser} />
      </div>
    </div>
  );
};
