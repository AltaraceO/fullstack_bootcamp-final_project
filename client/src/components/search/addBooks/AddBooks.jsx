import React, { useState } from "react";
import url from "../../../api/api";
import "../bySubject/subject-api.css";

export const AddBooks = ({ book }) => {
  const [buttonText, setButtonText] = useState("Add to my book list");

  const onHandleAddBook = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const addedBook = await url.post("/books", book);
      await url.post("/users/addBook", addedBook.data, config);
      setButtonText("Book added");
    } catch (err) {
      console.log("Error:", err.response.data);
    }
  };
  return (
    <>
      <button className="reg-button" onClick={onHandleAddBook}>
        {buttonText}
      </button>
    </>
  );
};
