import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { UserLogout } from "../logoutUser/UserLogout";
import "../registration/registration.css";

export const NewUser = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [pwVisibility, setPwVisibility] = useState("password");
  const [message, setMessage] = useState("");

  const onHandleChecked = () => {
    if (pwVisibility === "password") {
      setPwVisibility("text");
    } else {
      setPwVisibility("password");
    }
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!state.name && !state.email && !state.password) {
      setMessage("All input fields must be complete");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    try {
      const { name, email, password } = state;
      const newObj = {
        name,
        email,
        password,
      };
      const { data } = await url.post("/users", newObj);
      console.log(data);
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
        <div>
          {/* <label htmlFor="name">Name</label> */}
          <input
            placeholder="Name"
            className="input"
            onChange={onHandleChange}
            type="text"
            name="name"
          />

          <label htmlFor="email">E-mail</label>
          <input
            placeholder="Email"
            className="input"
            onChange={onHandleChange}
            type="text"
            name="email"
          />
          <div className="pass-submit">
            <label htmlFor="password">Password</label>
            <div className="input-icon-container">
              <input
                placeholder="Password"
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
            <button className="reg-button" onClick={onHandleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
      {message && <span> {message} </span>}
      {currentUser && (
        <div>
          {" "}
          <span>Welcome {currentUser.name}!</span>
          <UserLogout />
        </div>
      )}
    </>
  );
};
