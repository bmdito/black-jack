import React, { Component } from "react";

class Logout extends Component {
  handleLogout = event => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("diff");
    localStorage.removeItem("name");
    localStorage.removeItem("funds");
    window.location.href = "/";
  };

  render() {
    return (
      <button href="/" className="logButt" onClick={this.handleLogout}>
        Logout
      </button>
    );
  }
}

export default Logout;
