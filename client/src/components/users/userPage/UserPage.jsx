import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { DisplayUserBooks } from "../userPage/displayUserBooks/DisplayUserBooks";
import { RegularMessage } from "../../messages/RegularMessage";
import { BookDetails } from "./bookDetails/BookDetails";

export const UserPage = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const [bookData, setBookData] = useState("");
  const [genreData, setGenreData] = useState("");
  const [individualBook, setIndividualBook] = useState("");
  // const [message, setMessage] = useState("");

  const history = useHistory();

  const getBookDetails = (book) => {
    setIndividualBook(book);
  };

  useEffect(() => {
    if (!currentUser) {
      history.push("/registration");
    }
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
      history.push("/registration");
    } else {
      getUserBooks();
    }
  }, [currentUser, history]);

  return (
    <>
      {genreData ? (
        genreData.map((g) => {
          return (
            <div key={g._id}>
              <span>{g.genre} -</span>
              <span> {((g.value / bookData.length) * 100).toFixed(2)}%</span>
            </div>
          );
        })
      ) : (
        <div>Add genre</div>
      )}
      {bookData && bookData.length !== 0 ? (
        <DisplayUserBooks func={getBookDetails} results={bookData} />
      ) : (
        <RegularMessage message={"Add books by selecting search results"} />
      )}
      {individualBook && <BookDetails details={individualBook} />}
    </>
  );
};
