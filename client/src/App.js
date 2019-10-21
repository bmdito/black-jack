import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Landing from "./components/Landing/landing";
import Register from "./components/Register/index";
import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/index";

import { Button } from "react-bootstrap";
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
        {/* navbar here */}
        <Route exact path="/" component={Landing} />
        <section className="App">
          <Switch>
            {/* <Route exact path="/register" component={Register} /> */}
            <Route exact path="/table" component={Table} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
