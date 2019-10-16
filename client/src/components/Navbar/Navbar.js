import React, { Fragment } from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";

const Modal1 = ({ onRequestClose, ...otherProps }) => (
  <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <button onClick={onRequestClose}>close</button>
    <div>I am a modal</div>
  </Modal>
);

const Modal2 = ({ onRequestClose, foo, ...otherProps }) => (
  <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <button onClick={onRequestClose}>close</button>
    <div>second modal {foo}</div>
  </Modal>
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
            Navbar
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
                          <button onClick={() => showModal(Modal1)}>
                            Log In
                          </button>
                          <button onClick={() => showModal(Modal2)}>
                            Register
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
