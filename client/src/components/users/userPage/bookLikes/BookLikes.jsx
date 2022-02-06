import React, { useEffect, useState } from "react";
import url from "../../../../api/api";

export const BookLikes = ({ book, user }) => {
  const [isActive, setIsActive] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const onHandleLike = async () => {
    const { data } = await url.post("/books/like", book, config);
  };

  useEffect(() => {
    const checkLike = async () => {
      console.log("started");
    };
  }, []);

  return (
    <div>
      <button disabled={isActive}>Like</button>
    </div>
  );
};
