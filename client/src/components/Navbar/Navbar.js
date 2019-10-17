import React, { Fragment } from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";
import Register from "../Register/index";
import Login from "../Login/Login";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
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

function Navbar() {
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <span className="brandy">Hot Aces</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {checkAuth() ? (
              <>
                <div className="ml-auto">
                  <button className="logButt" href="/" color="inherit">
                    <span className="navFont">My Profile</span>
                  </button>
                  <Link to="/table">
                    <button type="button" className="logButt" color="inherit">
                      <span className="navFont">Join Table</span>
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* My Profile  */}
                <button className="logButt navHide" href="/" color="inherit">
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
              <button className="logButt logOut">logout</button>
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
            {/* <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <a className="nav-link" href="/Login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Register">
                  Register
                </a>
              </li>
            </ul> */}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
