import React, { useEffect, useState } from "react";
import url from "../../../../api/api";

export const BookLikes = ({ book, user }) => {
  const [isActive, setIsActive] = useState(false);
  const []

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const onHandleLike = async () => {
    try {
      const { data } = await url.post("/books/like", book, config);
      console.log(data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const checkLike = async () => {
      console.log("started");
    };
  }, []);

  return (
    <div>
      <button onClick={onHandleLike} disabled={isActive}>
        Like
      </button>
    </div>
  );
};
