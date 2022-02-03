import React, { useEffect, useState } from "react";
// import axios from "axios";
// const url = "https://openlibrary.org";
import url from "../../../api/openLibApi";

export const SubjectApi = () => {
  const [cat, setCat] = useState("");
  const [bookInfo, setBookInfo] = useState([]);

  const onHandleChange = (e) => {
    setCat(e.target.value);
  };

  const getOpenLib = async (e) => {
    e.preventDefault();
    const { data } = await url.get(`/subjects/${cat}.json?limit=50`);
    console.log(data.works);
    setBookInfo(data.works);
  };

  useEffect(() => {
    const getMoreBookInfo = async () => {
      bookInfo.map(async (book) => {
        const bookObj = {
          author: book.authors.map((auth) => auth.name),
          title: book.title,
          categories: book.subject,
        };
        const bookIsbn = await url.get(`/books/${book.cover_edition_key}.json`);
        console.log(bookIsbn.data);
        bookObj.pages = bookIsbn.data.number_of_pages;
        bookObj.isbn_13 = bookIsbn.data.isbn_13;
        bookObj.isbn_10 = bookIsbn.data.isbn_10;
        console.log(bookObj);
        return bookObj;
      });
    };
    if (bookInfo.length) {
      getMoreBookInfo();
    }
  }, [bookInfo]);

  return (
    <div>
      <form>
        <label htmlFor="book"></label>
        <input onChange={onHandleChange} type="text" name="book" value={cat} />
        <br />
        <button onClick={getOpenLib}>Submit</button>
      </form>
    </div>
  );
};
