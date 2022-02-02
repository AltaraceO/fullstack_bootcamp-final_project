import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/homePage/Home";
import { NewUser } from "./components/newUser/NewUser";
import { Book } from "./components/books/Book";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/newUser" component={NewUser} />
          <Route exact path="/search" component={Book} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
