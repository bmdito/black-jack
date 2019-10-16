import React, { Fragment } from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";
import Register from "../Register/index";
import "./Navbar.css";

const Modal1 = ({ onRequestClose, ...otherProps }) => (
  <div className="modal-wrapper">
    <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
      {/* <button onClick={onRequestClose}>close</button> */}
      <div>Here is login!</div>
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
  return false;
};

function Navbar() {
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Hot Aces
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {checkAuth() ? (
              <div>logout</div>
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
