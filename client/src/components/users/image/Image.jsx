import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import "../../NavBar/NavBar.css";
import avatar from "../../../img/avatar.png";

export const Image = () => {
  const [currentUser] = useContext(UserContext)["user"];
  const [image, setImage] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
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
      {image ? (
        <img
          className="profile-pic"
          src={`data:image/png;base64,${image}`}
          alt=""
        />
      ) : (
        <img className="profile-pic" src={avatar} alt="" />
      )}
    </div>
  );
};
