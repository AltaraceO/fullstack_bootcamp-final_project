import React, { useEffect, useState } from "react";
// import { UserContext } from "../UserContext";
import url from "../../../api/openLibApi";
import googleUrl from "../../../api/googleApi";
import { DisplayResults } from "../displaySearchResults/DisplayResults";
import "./subject-api.css";
import logo from "../../../spinner/hourGls.gif";
import { ToTheTop } from "../../toTheTop/ToTheTop";

export const SubjectApi = () => {
  const [cat, setCat] = useState("");
  const [bookRawInfo, setBookRawInfo] = useState([]);
  const [bookResults, setBookResults] = useState("");
  // const [currentUser] = useContext(UserContext)["user"];
  const [spinner, setSpinner] = useState(false);
  const numberOfResults = 60;

  const onHandleChange = (e) => {
    setCat(e.target.value);
  };

  //get books by category
  // useEffect(()=>{

  // },[])
  const onHandleClick = async (e) => {
    e.preventDefault();
    setBookResults("");
    setSpinner(true);
    const { data } = await url.get(
      `/subjects/${cat.trim()}.json?limit=${numberOfResults}`
    );
    setBookRawInfo(data.works);
    setCat("");
  };

  const makeBookObjects = React.useCallback(async () => {
    const allBooks = await Promise.all(
      bookRawInfo.map(async (book) => {
        const bookObj = {
          authors: book.authors.map((auth) => auth.name),
          title: book.title,
          categories: book.subject,
        };
        //use Open Library's book key to get ISBN numbers, pages and publishers

        if (!book.cover_edition_key) {
          return;
        }
        const bookIsbn = await url.get(`/books/${book.cover_edition_key}.json`);
        if (!bookIsbn.data.isbn_13) {
          return;
        }
        bookObj.url = `https://openlibrary.org${bookIsbn.data.key}`;
        bookObj.pages = bookIsbn.data.number_of_pages;
        bookObj.isbn_13 = bookIsbn.data.isbn_13[0];
        bookObj.isbn_10 = bookIsbn.data.isbn_10?.[0];
        bookObj.publishers = bookIsbn.data.publishers?.map((pub) => pub);
        //get book thumbnail and subtitle from Google by ISBN number
        const bookImg = await googleUrl.get(`isbn:${bookIsbn.data.isbn_13}`);
        //conditional chaining when looking through objects
        if (!bookImg.data.items?.[0].volumeInfo.imageLinks) {
          return;
        }
        bookObj.small_thumb =
          bookImg.data.items[0].volumeInfo.imageLinks.smallThumbnail;
        bookObj.thumb = bookImg.data.items[0].volumeInfo.imageLinks.thumbnail;
        bookObj.subtitle = bookImg.data.items[0].volumeInfo.subtitle || "";
        return bookObj;
      })
    );
    return allBooks;
  }, [bookRawInfo]);

  useEffect(() => {
    const abortCont = new AbortController();
    const getMoreBookRawInfo = async () => {
      const books = await makeBookObjects();
      setSpinner(false);
      setBookResults(books.filter((b) => b !== undefined));
    };

    if (bookRawInfo.length) {
      getMoreBookRawInfo();
    }

    return () => abortCont.abort();
  }, [bookRawInfo, makeBookObjects]);

  return (
    <div className="search-container">
      <form className="search-form-container">
        <label htmlFor="book"></label>
        <input
          className="input"
          onChange={onHandleChange}
          type="text"
          name="book"
          value={cat}
        />
        <br />
        <button className="reg-button" onClick={onHandleClick}>
          Search
        </button>
      </form>
      {spinner && <img className="hour-glass" src={logo} alt="hourGlass" />}
      {bookResults && <DisplayResults results={bookResults} />}
      <ToTheTop />
    </div>
  );
};
