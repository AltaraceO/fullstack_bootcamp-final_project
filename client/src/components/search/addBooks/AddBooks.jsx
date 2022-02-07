import React from "react";

import url from "../../../api/api";

export const AddBooks = ({ book }) => {
  //redirect if current user doesn't exist?(there will not be a button if current user isn't there)

  const onHandleAddBook = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const addedBook = await url.post("/books", book);
      await url.post("/users/addBook", addedBook.data, config);
    } catch (err) {
      console.log("Error:", err.response.data);
    }
  };
  return (
    <>
      <button onClick={onHandleAddBook}>Add to my book list</button>
    </>
  );
};
