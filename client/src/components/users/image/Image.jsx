import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";

export const Image = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const [image, setImage] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const { data } = await url.get("/users/getUser", config);
        setImage(data.avatar);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (currentUser) {
      getImage();
    }
  }, [currentUser]);

  return (
    <div>
      <button>click</button>
      {image && <img src={`data:image/png;base64,${image}`} alt="" />}
    </div>
  );
};
