import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/homePage/Home";
import { NewUser } from "./components/users/newUser/NewUser";
import { UserLogin } from "./components/users/loginUser/UserLogin";
import { SubjectApi } from "./components/search/bySubject/SubjectApi";
import { BookApi } from "./components/search/byBook/BookApi";
import { UserPage } from "./components/users/userPage/UserPage";
import { ChatRoom } from "./components/chatRoom/mainChat/ChatRoom";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newUser" component={NewUser} />
            <Route exact path="/userLogin" component={UserLogin} />
            <Route exact path="/search-subject" component={SubjectApi} />
            <Route exact path="/search-book" component={BookApi} />
            <Route exact path="/user-page" component={UserPage} />
            <Route exact path="/chat" component={ChatRoom} />
          </Switch>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
