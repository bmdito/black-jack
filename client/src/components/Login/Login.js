import React, { Component, Fragment } from "react";
import "./style.css";
import API from "../../utils/API";
import spades from "../../assets/images/ace-of-spades.jpg";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    failedError: ""
  };

  validate = () => {
    let nameErr = "";
    let emailErr = "";
    let passErr = "";

    if (!this.state.email.includes("@")) {
      emailErr = "Please choose a valid email!";
    }

    if (!this.state.email.includes(".com")) {
      emailErr = "Please choose a valid email";
    }

    if (this.state.password.length < 6) {
      passErr = "Passwords must be at least 6 characters";
    }

    if (emailErr || passErr || nameErr) {
      this.setState({
        emailError: emailErr,
        passwordError: passErr,
        nameError: nameErr
      });
      return false;
    }
    return true;
  };

  handleInputChange = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("you submitted");
    let isValid = this.validate();
    if (isValid) {
      API.userLogin({
        email: this.state.email.toLowerCase(),
        password: this.state.password
      })
        .then(res => {
          localStorage.setItem("x-auth-token", res.data.token);
          window.location.href = "/";
          alert("Login Success!");
        })
        .catch(err => console.log(err));
    } else {
      let failedError = "login Failed!";

      this.setState({
        failedError
      });
    }
  };

  render() {
    return (
      <Fragment>
        <img className="spade-logo" src={spades} />
        <h1>Sign in</h1>
        <h3 className="indicator">Log in to your account</h3>
        <form className="form">
          <div className="form-group">
            <div className="error-style">{this.state.emailError}</div>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <div className="error-style">{this.state.passwordError}</div>
            <input
              type="text"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="subButt" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

export default Login;
