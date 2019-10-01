import React, { Component } from "react";
import container from "react-bootstrap";
import "./style.css";

class Table extends Component {
  render() {
    return (
      <>
        <div className="container container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="table-visual">
                <div className="dealerPos">dealer</div>
                <div className="posOne">
                  Pos1
                  <div className="betOne betDiv">pos3</div>
                </div>
                <div className="posTwo">
                  pos2
                  <div className="betTwo betDiv">pos3</div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </>
    );
  }
}

export default Table;
