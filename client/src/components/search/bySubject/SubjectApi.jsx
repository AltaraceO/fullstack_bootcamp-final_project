import React, { useEffect, useState } from "react";
import url from "../../../api/openLibApi";
import gooUrl from "../../../api/googleApi";

export const SubjectApi = () => {
  const [cat, setCat] = useState("");
  const [bookInfo, setBookInfo] = useState([]);
  const numberOfResults = 7;

  const onHandleChange = (e) => {
    setCat(e.target.value);
  };

  const getOpenLib = async (e) => {
    e.preventDefault();
    const { data } = await url.get(
      `/subjects/${cat}.json?limit=${numberOfResults}`
    );
    console.log("where is this?", data.works);
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
        if (!bookIsbn.data.isbn_13) {
          return;
        }
        // console.log("lib", bookIsbn.data);

        bookObj.pages = bookIsbn.data.number_of_pages;
        bookObj.isbn_13 = bookIsbn.data.isbn_13;
        bookObj.isbn_10 = bookIsbn.data.isbn_10;
        bookObj.publishers = bookIsbn.data.publishers.map((pub) => pub);

        const bookImg = await gooUrl.get(`isbn:${bookIsbn.data.isbn_13}`);
        //conditional chaining when looking through objects
        if (!bookImg.data.items?.[0].volumeInfo.imageLinks) {
          return;
        }
        // console.log("google", bookImg.data.items[0].volumeInfo);
        bookObj.thumb = bookImg.data.items[0].volumeInfo.imageLinks.thumbnail;

        // console.log(bookImg.data.items[0].volumeInfo.subtitle);
        bookObj.subtitle = bookImg.data.items[0].volumeInfo.subtitle || "";
        console.log("obj", bookObj);
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
