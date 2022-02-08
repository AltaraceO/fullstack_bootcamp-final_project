import "./styles/App.css";
import "./styles/utilities.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./components/homePage/Home";
import { SubjectApi } from "./components/search/bySubject/SubjectApi";
// import { BookApi } from "./components/search/byBook/BookApi";
import { UserPage } from "./components/users/userPage/UserPage";
import { Registration } from "./components/users/registration/Registration";

function App() {
  return (
    <div className="entire-site">
      <Router>
        <UserProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/registration" component={Registration} />

            <Route exact path="/search-subject" component={SubjectApi} />

            <Route exact path="/user-page" component={UserPage} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
