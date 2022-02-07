import React from "react";
import url from "../../../../api/api";

export const RemoveBook = ({ book, func }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const onHandleRemove = async () => {
    await url.post("/users/removeBook", book, config);
    const books = await url.get("/books/getBooks", config);
    func(books.data);
  };
  return (
    <div>
      <button onClick={onHandleRemove}>Remove Book</button>
    </div>
  );
};
