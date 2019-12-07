import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../../utils/API";
import decode from "jwt-decode";
import "./style.css";

class Profile extends Component {
  state = {
    profileInfo: null
  };

  getUserInfo = id => {
    API.checkAvailChips(id)
      .then(res => {
        this.setState({ profileInfo: res.data.filter(dat => dat._id === id) });
        console.log(this.state.profileInfo[0]);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    var token = localStorage.getItem("x-auth-token");
    var decoded = decode(token);
    var id = decoded.user.id;
    this.getUserInfo(id);
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col md={12}>
              <div className="profile-header">My Profile</div>
            </Col>
          </Row>
          {this.state.profileInfo !== null &&
          this.state.profileInfo !== undefined &&
          this.state.profileInfo.length !== 0 ? (
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <div className="profile-content">
                  <div className="profile-pic">
                    <img src={this.state.profileInfo[0].avatar} alt="user" />
                  </div>

                  <div className="profile-item-title">
                    User Name:
                    <span className="profile-item">
                      {this.state.profileInfo[0].name}
                    </span>
                  </div>
                  <div className="profile-item-title">
                    Email Address:
                    <span className="profile-item">
                      {this.state.profileInfo[0].email}
                    </span>
                  </div>
                  <div className="profile-item-title">
                    Total Chips:
                    <span className="profile-item">
                      {this.state.profileInfo[0].chips}
                    </span>
                  </div>
                  {/* <div className="profile-item-title">
                    About Me:
                    <span className="profile-item">
                      {this.state.profileInfo[0].chips}
                    </span>
                  </div> */}
                </div>
              </Col>
            </Row>
          ) : (
            <Fragment>
              <h1>Loading</h1>
            </Fragment>
          )}
        </Container>
      </Fragment>
    );
  }
}

export default Profile;
