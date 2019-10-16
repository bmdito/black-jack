import React, { Component, Fragment } from "react";
import "./style.css";
import API from "../../utils/API";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    nameError: "",
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

    if (this.state.name.length < 1) {
      nameErr = "Please choose a Name";
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
      API.userRegister({
        name: this.state.name,
        email: this.state.email.toLowerCase(),
        password: this.state.password
      })
        .then(res => {
          console.log(res);
          API.userLogin({
            email: this.state.email,
            password: this.state.password
          })
            .then(res => {
              localStorage.setItem("x-auth-token", res.data.token);
              window.location.href = "/";
              alert("Register success!");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      let failedError = "Registration Failed!";

      this.setState({
        failedError
      });
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Sign Up</h1>
        <h3>Create your account</h3>
        <form className="form">
          <div className="form-group">
            <div className="error-style">{this.state.nameError}</div>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
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
          <div className="form-group">
            <input
              type="text"
              placeholder="confirm password"
              name="password2"
              value={this.state.password2}
              onChange={this.handleInputChange}
            />
          </div>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {/* <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            // required
          />

          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            // minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            // minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p> */}
      </Fragment>
    );
  }
}

export default Register;
