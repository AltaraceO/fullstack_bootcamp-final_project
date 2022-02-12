import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useHistory } from "react-router-dom";
import url from "../../../api/api";
import "./delete-account.css";

export const DeleteAccount = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];

  const history = useHistory();
  const onHandleClick = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await url.delete("/users/deleteUser", config);
      console.log(data);
      console.log(currentUser);
      localStorage.removeItem("authToken");
      setCurrentUser("");
    } catch (err) {
      console.log(err.response);
    }
  };

  const cancelDelete = () => {
    history.push("/user-page");
  };
  return (
    <div className="warning-box">
      <h2>Are you sure you want to delete your account ?</h2>
      <button onClick={onHandleClick} className="delete-button">
        Delete
      </button>
      <button onClick={cancelDelete} className="delete-button">
        Cancel
      </button>
    </div>
  );
};
