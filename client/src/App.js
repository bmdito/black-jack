import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Table from "./components/Table";
import Landing from "./components/Landing/landing";
import Register from "./components/Register/index";
import Navbar from "./components/Navbar/Navbar";

import { Button } from "react-bootstrap";
// import makeDeck from "./utils/deck";

import "./App.css";

function App() {
  // makeDeck();
  return (
    <Router>
      <Navbar />
      <Fragment>
        {/* navbar here */}
        <Route exact path="/" component={Landing} />
        <section className="App">
          <Switch>
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/login" component={Login} /> */}
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
