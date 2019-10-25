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
            <Col md={{ span: 8, offset: 2 }}>
              <div className="profile-content">
                <div className="profile-item"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Profile;
