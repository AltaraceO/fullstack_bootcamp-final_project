import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { DisplayUserBooks } from "../userPage/displayUserBooks/DisplayUserBooks";

export const UserPage = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const [bookData, setBookData] = useState("");
  const [genreData, setGenreData] = useState("");

  const history = useHistory();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const getUserBooks = async () => {
      try {
        //config comes second with GET and third in POST!!
        const books = await url.get("/books/getBooks", config);
        const genres = await url.get("/books/getGenres", config);

        setGenreData(genres.data);
        setBookData(books.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    if (!currentUser) {
      history.push("/");
    } else {
      getUserBooks();
    }
  }, [currentUser, history]);

  return (
    <>
      {genreData &&
        genreData.map((g) => {
          return (
            <div key={g._id}>
              <span>{g.genre} -</span>
              <span> {((g.value / bookData.length) * 100).toFixed(2)}%</span>
            </div>
          );
        })}
      {bookData && <DisplayUserBooks results={bookData} />}
    </>
  );
};
