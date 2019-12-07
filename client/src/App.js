import React, { Fragment } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Landing from "./components/Landing/landing";
import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/index";
import Profile from "./components/Profile/index";

import decode from "jwt-decode";

import "./App.css";

const checkAuth = () => {
  const token = localStorage.getItem("x-auth-token");
  if (!token) {
    return false;
  }

  try {
    //get expiration time and user id from token
    const { exp } = decode(token);
    if (exp < Date.now() / 1000) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

function App() {
  return (
    <Router>
      <Navbar />
      <Fragment>
        <section className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            {/* <Route exact path="/register" component={Register} /> */}
            <AuthRoute exact path="/table" component={Table} />
            <AuthRoute exact path="/profile" component={Profile} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
