import React, { useState } from "react";
import url from "../../../api/googleApi";

export const BookApi = () => {
  const [cat, setCat] = useState("");

  const onHandleChange = (e) => {
    setCat(e.target.value);
  };

  const getOpenLib = async (e) => {
    e.preventDefault();
    const { data } = await url.get(`+isbn:${cat}`);
    console.log(data);
  };
  return (
    <>
      <form>
        <label htmlFor="book">Search by ISBN, author, or book title</label>
        <input onChange={onHandleChange} type="text" name="book" value={cat} />
        <br />
        <button onClick={getOpenLib}>Submit</button>
      </form>
    </>
  );
};
