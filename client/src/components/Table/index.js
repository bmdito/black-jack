import React, { Component } from "react";
import container, { Button } from "react-bootstrap";
import "./style.css";
// import { theGame } from "../../utils/deck";

class Table extends Component {
  state = {
    theDeck: [],
    currentShuffle: [],
    dealerHand: [],
    playerHand: [],
    currentBet: null,
    chipStack: 100,
    betInPlay: null,
    hideBetDiv: false
  };

  componentDidMount() {
    this.makeDeck();
  }

  handleInputChange = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.chipStack - this.state.currentBet < 0) {
      alert("You dont have enough chips!");
    } else if (this.state.currentBet > this.state.maxBet) {
      alert("Bet exceeds max bet!");
    } else {
      // DEAL INITIAL HANDS

      let inPlay = this.state.currentBet;
      let adjusted = this.state.chipStack - this.state.currentBet;
      this.setState({
        chipStack: adjusted,
        betInPlay: inPlay,
        hideBetDiv: true
      });
      this.deal();
    }
  };

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
    const suits = ["♦", "♣", "♥", "♠"];

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

  deal = () => {
    console.log("you clicked deal!");
    // console.log("... dealing cards");
    //   var playerDealt = [];
    //   var dealerDealt = [];
    //   playerDealt.push()
    // this.setState({

    // })
    // playerHand.push(currentShuffle[0], currentShuffle[2]);
    // dealerHand.push(currentShuffle[1], currentShuffle[3]);
    // console.log("player: ");
    // console.log(playerHand[0], playerHand[1]);
    // console.log("dealer :");
    // console.log(dealerHand[0], dealerHand[1]);
    // currentShuffle = currentShuffle.slice(4);
    // console.log(currentShuffle);
    // console.log("checking for 21");
  };
  render() {
    const betDivStyle = this.state.hideBetDiv ? { visibility: "hidden" } : {};
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
                  <Button bsclass="success" onClick={() => this.placeBet()}>
                    Place Bet
                  </Button>
                  <div id="bet-div" style={betDivStyle}>
                    <form>
                      <input
                        className="bet-input"
                        type="text"
                        name="currentBet"
                        placeholder=""
                        value={this.state.currentBet}
                        onChange={this.handleInputChange}
                        onSubmit={this.handleSubmit}
                      />
                      <button onClick={this.handleSubmit}>Submit</button>
                    </form>
                  </div>
                  <Button bsclass="success" onClick={() => this.shuffle()}>
                    Deal
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
