import React, { useState } from "react";
// import axios from "axios";
// const url = "https://openlibrary.org";
import url from "../../api/openLibApi";

export const Book = () => {
  const [cat, setCat] = useState("");

  const onHandleChange = (e) => {
    setCat(e.target.value);
  };

  const getOpenLib = async (e) => {
    e.preventDefault();
    const { data } = await url.get(`/subjects/${cat}.json`);
    console.log(data);
  };
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
