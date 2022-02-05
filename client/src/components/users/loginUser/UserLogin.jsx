import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";
import { UserLogout } from "../logoutUser/UserLogout";

export const UserLogin = () => {
  const [state, setState] = useState({
    email: "nina@nina.com",
    password: "same4all",
  });
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [message, setMessage] = useState("");

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
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
        <br />
        <label htmlFor="email">E-mail</label>
        <input
          onChange={onHandleChange}
          type="text"
          name="email"
          value={state.email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          onChange={onHandleChange}
          type="text"
          name="password"
          value={state.password}
        />
        <br />
        <button onClick={onHandleSubmit}>Submit</button>
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
