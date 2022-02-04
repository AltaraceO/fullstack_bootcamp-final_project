import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import url from "../../../api/api";

export const NewUser = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [currentUser, setCurrentUser] = useContext(UserContext)["user"];
  const [message, setMessage] = useState("");

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
        <br />
        <label htmlFor="name">Name</label>
        <input onChange={onHandleChange} type="text" name="name" />
        <br />
        <label htmlFor="email">E-mail</label>
        <input onChange={onHandleChange} type="text" name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input onChange={onHandleChange} type="text" name="password" />
        <br />
        <button onClick={onHandleSubmit}>Submit</button>
      </form>
      {message && <span> {message} </span>}
      {currentUser && <span>Welcome {currentUser.name}!</span>}
    </>
  );
};
