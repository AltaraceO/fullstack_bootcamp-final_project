import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";

export const AddBooks = ({ book }) => {
  const [currentUser] = useContext(UserContext)["user"];

  //redirect if current user doesn't exist?(there will not be a button if current user isn't there)

  const onHandleAddBook = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const addedBook = await url.post("/books", book);
      console.log(addedBook.data);
      const addToUser = await url.post(
        "/users/addBook",
        addedBook.data,
        config
      );
      console.log(addToUser.data);
    } catch (err) {
      console.log("Error:", err.response.data);
    }
  };
  return (
    <div>
      <button onClick={onHandleAddBook}>Add to my book list</button>
    </div>
  );
};
