import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";
import Register from "../Register/index";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import spades from "../../assets/images/ace-of-spades.jpg";
import { Nav, Navbar } from "react-bootstrap";
// import Navbar from "react-bootstrap";
import "./Navbar.css";

const Modal1 = ({ onRequestClose, ...otherProps }) => (
  <div className="modal-wrapper">
    <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
      {/* <button onClick={onRequestClose}>close</button> */}
      <Login />
    </Modal>
  </div>
);

const Modal2 = ({ onRequestClose, foo, ...otherProps }) => (
  <div className="modal-wrapper">
    <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
      {/* <button onClick={onRequestClose}>close</button> */}
      <Register />
    </Modal>
  </div>
);

const checkAuth = () => {
  const token = localStorage.getItem("x-auth-token");
  if (!token) {
    return false;
  } else {
    //Get expiration and id of user from token
    const { exp } = decode(token);
    if (exp < Date.now() / 1000) {
      return false;
    }
  }
  return true;
};

const navStyle = {
  borderBottom: "4px solid black"
};

class Thenavbar extends Component {
  componentDidMount() {
    // window.addEventListener("scroll", () => {
    //   const isTop = window.scrollY > 100;
    //   const getNav = document.getElementById("navy");
    //   if (isTop) {
    //     getNav.classList.add("scrolled");
    //     console.log("Scroll add triggered");
    //   } else {
    //     getNav.classList.remove("scrolled");
    //   }
    // });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll");
  }

  render() {
    return (
      <>
        {/* <div className="container-fullwidth"> */}
        <Navbar sticky="top" style={navStyle} bg="light" expand="lg">
          <Navbar.Brand href="#">
            <img className="spade-logo" src={spades} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <div id="navy" className=""> */}
            <Nav
              className="ml-auto"
              // style={navStyle}

              // className="navbar navbar-expand-lg navbar-light bg-light"
            >
              {/* <a className="navbar-brand" href="#">
                <img className="spade-logo" src={spades} />
              </a> */}
              {/* <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              > */}
              {checkAuth() ? (
                <>
                  {/* <div className="ml-auto"> */}
                  <Nav.Link>
                    <Link to="/profile">
                      <button className="logButt" color="inherit">
                        <span className="navFont">My Profile</span>
                      </button>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/table">
                      <button type="button" className="logButt" color="inherit">
                        <span className="navFont">Join Table</span>
                      </button>
                    </Link>
                  </Nav.Link>
                  {/* </div> */}
                </>
              ) : (
                <>
                  {/* My Profile  */}
                  <button className="logButt navHide" color="inherit">
                    <span className="navFont">My Profile</span>
                  </button>
                  {/* Join Table Button */}
                  <button
                    className="logButt navHide"
                    href="/table"
                    color="inherit"
                  >
                    <span className="navFont">Join Table</span>
                  </button>
                </>
              )}
              {checkAuth() ? (
                <Logout />
              ) : (
                <>
                  <div className="ml-auto">
                    <ModalProvider>
                      <ModalRoot />
                      <ModalConsumer>
                        {({ showModal }) => (
                          <Fragment>
                            <button
                              className="logButt"
                              onClick={() => showModal(Modal1)}
                            >
                              <span className="navFont">Login</span>
                            </button>
                            <button
                              className="logButt"
                              onClick={() => showModal(Modal2)}
                            >
                              <span className="navFont">Register</span>
                            </button>
                          </Fragment>
                        )}
                      </ModalConsumer>
                    </ModalProvider>
                  </div>
                </>
              )}
              {/* </div> */}
            </Nav>
            {/* </div> */}
            {/* </div> */}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Thenavbar;
