import React from "react";
import Table from "./components/Table";
import { Button } from "react-bootstrap";
// import makeDeck from "./utils/deck";

import "./App.css";

function App() {
  // makeDeck();
  return (
    <div className="App">
      <Table />
      {/* <Button bsStyle="success">Test</Button> */}
    </div>
  );
}

export default App;
