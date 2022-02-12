import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { DisplayUserBooks } from "../userPage/displayUserBooks/DisplayUserBooks";
import { RegularMessage } from "../../messages/RegularMessage";
import { BookDetails } from "./bookDetails/BookDetails";
import logo from "../../../spinner/hourGls.gif";
import "./user-page.css";

export const UserPage = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const [bookData, setBookData] = useState("");
  const [genreData, setGenreData] = useState("");
  const [individualBook, setIndividualBook] = useState("");
  const [sendIndivBook, setSendIndivBook] = useState("");
  const [spinner, setSpinner] = useState(false);

  const history = useHistory();

  const getBookDetails = (book) => {
    setIndividualBook((prevState) => book);
  };

  useEffect(() => {
    setSendIndivBook(individualBook);
  }, [sendIndivBook, individualBook]);

  const bookRemovedReRender = (newBookList) => {
    setBookData(newBookList);
    setIndividualBook("");
  };
  const bookLike = (newBookList) => {
    setBookData(newBookList);
    // setIndividualBook("");
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
      setSpinner(true);
      try {
        //config comes second with GET and third in POST!!
        const books = await url.get("/books/getBooks", config);
        const genres = await url.get("/books/getGenres", config);

        setGenreData(genres.data);
        setBookData(books.data);
      } catch (err) {
        console.log(err.response);
      }
      setSpinner(false);
    };
    if (!currentUser) {
      history.push("/registration");
    } else {
      getUserBooks();
    }
  }, [currentUser, history]);

  const renderIndividual = () => {
    return (
      <>
        {sendIndivBook && (
          <BookDetails
            likeFunc={bookLike}
            func={bookRemovedReRender}
            details={sendIndivBook}
          />
        )}
      </>
    );
  };

  const renderCarousel = () => {
    return (
      <div className="carousel">
        {bookData && bookData.length !== 0 ? (
          <DisplayUserBooks func={getBookDetails} results={bookData} />
        ) : (
          <RegularMessage
            message={
              "Add to your list by selecting books in the search results"
            }
          />
        )}
      </div>
    );
  };

  const renderGenre = () => {
    return genreData ? (
      genreData.map((g) => {
        return (
          <div className="genre" key={g._id}>
            <span>{g.genre}</span>
            <p> {((g.value / bookData.length) * 100).toFixed(2)}%</p>
          </div>
        );
      })
    ) : (
      <div>Add genre</div>
    );
  };

  return (
    <div className="user-page">
      <div className="genre-bar">
        <h3>Categories</h3>
        {spinner ? <div>...</div> : renderGenre()}
      </div>

      <div className="books-n-details">
        {spinner ? (
          <img className="hour-glass" src={logo} alt="hourGlass" />
        ) : (
          renderCarousel()
        )}
        {renderIndividual()}
      </div>
    </div>
  );
};
