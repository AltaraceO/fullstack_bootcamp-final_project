import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { UserLogout } from "../logoutUser/UserLogout";
import "../registration/registration.css";

export const UserLogin = () => {
  const [state, setState] = useState({
    email: "nina@nina.com",
    password: "same4all",
  });
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [message, setMessage] = useState("");
  const [pwVisibility, setPwVisibility] = useState("password");

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onHandleChecked = () => {
    if (pwVisibility === "password") {
      setPwVisibility("text");
    } else {
      setPwVisibility("password");
    }
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!state.email && !state.password) {
      setMessage("All input fields must be complete");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    try {
      const { email, password } = state;
      const newObj = {
        email,
        password,
      };
      const { data } = await url.post("/users/login", newObj);
      localStorage.setItem("authToken", data.token);
      setCurrentUser(data.user);
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <form>
        <br />
        <label htmlFor="email">E-mail</label>
        <input
          className="input"
          onChange={onHandleChange}
          type="text"
          name="email"
          value={state.email}
        />
        <br />
        <div className="input-icon-container">
          <input
            placeholder="Password"
            value={state.password}
            onChange={onHandleChange}
            type={pwVisibility}
            name="password"
          />
          <i
            className={
              pwVisibility === "password" ? "fa fa-eye" : "fa fa-eye-slash"
            }
            onClick={onHandleChecked}
          ></i>
        </div>
        <br />
        <button className="reg-button" onClick={onHandleSubmit}>
          Submit
        </button>
      </form>
      {message && <span> {message} </span>}
      {currentUser && (
        <div>
          <span>Welcome {currentUser.name}!</span>
          <UserLogout />
        </div>
      )}
    </>
  );
};
