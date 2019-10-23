import React, { Component, Fragment } from "react";
// import API from "../../utils/API";
import decode from "jwt-decode";
import axios from "axios";
import API from "../../utils/API";
import "./style.css";

class Withdrawal extends Component {
  state = {
    userInfo: null,
    withdrawal: null
  };

  checkChips = id => {
    console.log("check avail chips ran with id: " + id);

    API.checkAvailChips(id)
      .then(res => {
        this.setState({ userInfo: res.data.filter(dat => dat._id === id) });
        console.log(this.state.userInfo);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    var token = localStorage.getItem("x-auth-token");

    var decoded = decode(token);
    console.log(decoded);
    console.log(decoded.user.id);
    var id = decoded.user.id;

    this.checkChips(id);
  }

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
    let final = this.state.withdrawal;
    localStorage.setItem("funds", final);
  };

  validate = () => {
    let withdrawalError = "";
  };

  render() {
    return (
      <Fragment>
        <form className="form">
          <div className="form-group">
            {/* <div className="error-style">{this.state.emailError}</div> */}
            <h2 className="withdraw-title">Choose Withdrawal Amount</h2>
            {this.state.userInfo !== null &&
            this.state.userInfo !== undefined &&
            this.state.userInfo.length !== 0 ? (
              <>
                <h2 className="avail-text">
                  Available Chips:{" "}
                  <span className="chips-style">
                    {this.state.userInfo[0].chips}
                  </span>
                </h2>
              </>
            ) : (
              <>
                <h2>Loading</h2>
              </>
            )}

            <input
              type="text"
              className="withdrawal-input"
              placeholder="Withdrawal Amount"
              name="withdrawal"
              value={this.state.withdrawal}
              onChange={this.handleInputChange}
            />
            <button className="withdrawButt" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default Withdrawal;
