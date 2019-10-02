import React, { Component } from "react";
import container, { Button } from "react-bootstrap";
import "./style.css";
// import { theGame } from "../../utils/deck";

class Table extends Component {
  state = {
    theDeck: [],
    currentShuffle: [],
    dealerHand: [],
    playerHand: []
  };

  componentDidMount() {
    this.makeDeck();
  }

  //creates a deck of cards
  makeDeck() {
    var generatedDeck = [];
    function card(suit, val) {
      this.name = `${val} of ${suit}`;
      this.suit = suit;
      this.val = val;
    }

    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A"
    ];
    const suits = ["hearts", "clubs", "spades", "diamonds"];

    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < suits.length; j++) {
        generatedDeck.push(new card(suits[j], values[i]));
      }
    }
    console.log("...generating deck");

    this.setState({
      theDeck: generatedDeck
    });
  }

  shuffle() {
    var sample = this.state.theDeck;
    var shuffled = [];
    while (shuffled.length < 52) {
      var randIndex = Math.floor(Math.random() * 52);
      var current = sample[randIndex];
      if (shuffled.indexOf(current) < 0) {
        shuffled.push(current);
      }
    }

    console.log(shuffled);
    this.setState({
      currentShuffle: shuffled
    });
  }

  render() {
    return (
      <>
        <div className="container container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="table-visual">
                <div className="dealerPos">
                  <div className="card" id="cardA">
                    card
                  </div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                </div>
                <div className="posOne">
                  <div className="betOne betDiv">betOne</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <Button bsclass="success" onClick={() => this.shuffle()}>
                    button
                  </Button>
                </div>
                <div className="posTwo">
                  <div className="betTwo betDiv">betTwo</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
                  <div className="card">card</div>
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
