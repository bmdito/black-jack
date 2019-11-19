import React, { Component, Fragment } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./style.css";

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <Container fluid={true} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row>
            <Col md={12}>
              <div className="background-img">
                <div className="inner">
                  <h1 className="land-title">Hot aces</h1>
                  <p className="land-slogan">
                    The hottest Black Jack game on the interwebs
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="main-info">
                <h1 className="first-title-head">Welcome to Hot Aces!</h1>
                <p className="landing-text">
                  Hot aces is the new place to play this American Classic, and
                  the action has never been hotter! Face off against the dealer,
                  win pots, and build your chip stack! So if you love black jack
                  and all the hAwT action, we will see you at the tables!
                  Register today and join the action!
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="main-info-b">
                <h1 className="first-title-head">Make Big Moves!</h1>

                <p className="landing-text">
                  Features option to split hand, or double down to splash that
                  pot and maximize your bet! Beat the dealer in your heads up
                  battle to 21! Just dont go over 21 or you will be BUSTED!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Landing;
