import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Landing extends Component {
  render() {
    return (
      <>
        <div>Landing Page</div>
        <div className="background-img">
          <div className="inner">
            <div className="buttons">
              <div className="logButt">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </div>
              <div className="regButt">
                <Link to="/register" className="btn btn-light">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
