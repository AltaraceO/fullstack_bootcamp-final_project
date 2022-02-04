import React, { useEffect, useState } from "react";
import url from "../../../api/openLibApi";
import googleUrl from "../../../api/googleApi";
import { DisplayResults } from "../displaySearchResults/DisplayResults";

export const SubjectApi = () => {
  const [cat, setCat] = useState("");
  const [bookRawInfo, setBookRawInfo] = useState([]);
  const [bookResults, setBookResults] = useState("");
  const numberOfResults = 50;

  const onHandleChange = (e) => {
    setCat(e.target.value);
  };

  //get books by category
  const onHandleClick = async (e) => {
    e.preventDefault();
    setBookResults("");
    const { data } = await url.get(
      `/subjects/${cat.trim()}.json?limit=${numberOfResults}`
    );
    console.log("where is this?", data.works);
    setBookRawInfo(data.works);
  };

  const makeBookObjects = React.useCallback(async () => {
    const allBooks = await Promise.all(
      bookRawInfo.map(async (book) => {
        const bookObj = {
          author: book.authors.map((auth) => auth.name),
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
        bookObj.isbn_13 = bookIsbn.data.isbn_13;
        bookObj.isbn_10 = bookIsbn.data.isbn_10;
        bookObj.publishers = bookIsbn.data.publishers.map((pub) => pub);
        //get book thumbnail and subtitle from Google by ISBN number
        const bookImg = await googleUrl.get(`isbn:${bookIsbn.data.isbn_13}`);
        //conditional chaining when looking through objects
        if (!bookImg.data.items?.[0].volumeInfo.imageLinks) {
          return;
        }
        bookObj.thumb = bookImg.data.items[0].volumeInfo.imageLinks.thumbnail;
        bookObj.subtitle = bookImg.data.items[0].volumeInfo.subtitle || "";
        return bookObj;
      })
    );
    return allBooks;
  }, [bookRawInfo]);

  useEffect(() => {
    const getMoreBookRawInfo = async () => {
      const books = await makeBookObjects();
      setBookResults(books.filter((b) => b !== undefined));
    };

    if (bookRawInfo.length) {
      getMoreBookRawInfo();
    }
  }, [bookRawInfo, makeBookObjects]);

  console.log(bookResults);
  return (
    <div>
      <form>
        <label htmlFor="book"></label>
        <input onChange={onHandleChange} type="text" name="book" value={cat} />
        <br />
        <button onClick={onHandleClick}>Submit</button>
      </form>
      {bookResults && <DisplayResults results={bookResults} />}
    </div>
  );
};
