import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Landing extends Component {
  render() {
    return (
      <>
        <div className="background-img">
          <div className="landing-main">
            <h1 className="title-head">Welcome to Hot Aces!</h1>
            <p className="landing-text">
              You've found the hottest BlackJack game on the interwebs!
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
