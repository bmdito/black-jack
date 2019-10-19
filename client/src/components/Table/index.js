import React, { Component } from "react";
import container, { Button } from "react-bootstrap";
import "./style.css";

class Table extends Component {
  state = {
    theDeck: [],
    currentShuffle: [],
    dealerHand: [],
    playerHand: [],
    secondPlayerHand: [],
    dealerPoints: null,
    playerPoints: null,
    secPlayerPoints: null,
    secHandStand: false,
    currentBet: null,
    chipStack: 100,
    betInPlay: 0,
    hideBetDiv: true,
    showSplit: false,
    splitSelected: false,
    firstDeal: true,
    dealerTurn: false,
    dealerStand: false,
    isSit: false
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
      theDeck: generatedDeck,
      currentShuffle: generatedDeck
    });
  }
  // activates on sit
  takeSeat = () => {
    this.setState({
      // currentShuffle: shuffled,
      hideBetDiv: false,
      isSit: true
    });
    // this.promptBuyin();
    this.shuffle();
  };

  // promptBuyIn = () => {};

  //creates randomly shuffled deck
  shuffle = () => {
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
  };

  //Initial Deal
  deal = () => {
    console.log("you clicked deal!");
    console.log("... dealing cards");
    var playerDealt = [];
    var dealerDealt = [];
    var cards = this.state.currentShuffle;
    playerDealt.push(cards[0], cards[2]);
    dealerDealt.push(cards[1], cards[3]);
    var updated = cards.slice(4);

    this.setState({
      playerHand: playerDealt,
      dealerHand: dealerDealt,
      currentShuffle: updated
    });

    setTimeout(() => {
      this.scoreCheck();
    }, 1000);

    this.hitOption();
  };

  hitOption = () => {
    setTimeout(() => {
      this.setState({
        firstDeal: false
      });
    }, 2000);
  };

  //checkScore
  scoreCheck = () => {
    alert("you clicked score check");

    this.splitCheck();
    let sampDealerHand = [...this.state.dealerHand];
    console.log(sampDealerHand);
    let sampPlayerHand = [...this.state.playerHand];

    let currentDealer = 0;
    var currentPlayer = 0;
    var currentPlayerTwo = 0;
    var dealerAceCount = 0;
    var playerAceCount = 0;
    var playerAceCountTwo = 0;

    for (var i = 0; i < sampDealerHand.length; i++) {
      if (
        sampDealerHand[i].val === "J" ||
        sampDealerHand[i].val === "Q" ||
        sampDealerHand[i].val === "K"
      ) {
        currentDealer += 10;
      } else if (sampDealerHand[i].val === "A") {
        currentDealer += 11;
        dealerAceCount++;
      } else {
        currentDealer += parseInt(sampDealerHand[i].val);
      }
    }

    for (var i = 0; i < sampPlayerHand.length; i++) {
      if (
        sampPlayerHand[i].val === "J" ||
        sampPlayerHand[i].val === "Q" ||
        sampPlayerHand[i].val === "K"
      ) {
        currentPlayer += 10;
      } else if (sampPlayerHand[i].val === "A") {
        currentPlayer += 11;
        playerAceCount++;
      } else {
        currentPlayer += parseInt(sampPlayerHand[i].val);
      }
    }

    if (this.state.splitSelected) {
      let sampPlayerHandTwo = [...this.state.secondPlayerHand];
      for (var i = 0; i < sampPlayerHandTwo.length; i++) {
        if (
          sampPlayerHandTwo[i].val === "J" ||
          sampPlayerHandTwo[i].val === "Q" ||
          sampPlayerHandTwo[i].val === "K"
        ) {
          currentPlayerTwo += 10;
        } else if (sampPlayerHandTwo[i].val === "A") {
          currentPlayerTwo += 11;
          playerAceCountTwo++;
        } else {
          currentPlayerTwo += parseInt(sampPlayerHandTwo[i].val);
        }
      }
    }

    if (currentDealer > 21 && dealerAceCount > 0) {
      while (dealerAceCount > 0 && currentDealer > 21) {
        currentDealer -= 10;
        dealerAceCount--;
      }
    }

    if (currentPlayer > 21 && playerAceCount > 0) {
      while (playerAceCount > 0 && currentPlayer > 21) {
        currentPlayer -= 10;
        playerAceCount--;
      }
    }

    if (currentPlayerTwo > 21 && playerAceCountTwo > 0) {
      while (playerAceCountTwo > 0 && currentPlayerTwo > 21) {
        currentPlayerTwo -= 10;
        playerAceCountTwo--;
      }
    }
    // const d = this.dealerTurn(currentDealer);

    console.log("current player score:" + currentPlayer);
    console.log("current dealer score:" + currentDealer);
    console.log("current Split hand score" + currentPlayerTwo);
    this.setState({
      playerPoints: currentPlayer,
      dealerPoints: currentDealer,
      secPlayerPoints: currentPlayerTwo
    });

    if (
      this.state.dealerPoints === 21 &&
      this.state.dealerHand.length === 2 &&
      this.state.playerHand < 21
    ) {
      this.playerLose();
    }

    if (this.state.dealerStand) {
      // const final = this.roundOver(
      //   this.state.playerPoints,
      //   this.state.dealerPoints
      // );
      this.roundOver();
    }

    if (this.state.playerPoints > 21) {
      this.roundOver(this.state.playerPoints, this.state.dealerPoints);
    }
  };

  //Check to see if there is an option to split
  splitCheck = () => {
    if (!this.state.splitSelected) {
      if (this.state.playerHand[0].val === this.state.playerHand[1].val) {
        this.setState({
          showSplit: true
        });
      }
    }

    // if playerhand[0] && playerhand[1] are the same, option to split Appears
    // if chosen amount same as bet in play goes to split div
    // slice occurs and moves card over
    //Account for new player added <playerAdded bolean in state?>
  };

  // draw a card
  playerHit = () => {
    console.log("player hit!");
    if (this.state.splitSelected && this.state.secHandStand === false) {
      let splitCurrent = [
        ...this.state.secondPlayerHand,
        this.state.currentShuffle[0]
      ];
      this.setState({
        secondPlayerHand: splitCurrent
      });
    } else {
      let current = [...this.state.playerHand, this.state.currentShuffle[0]];
      this.setState({
        playerHand: current
      });
    }

    // let current = [...this.state.playerHand, this.state.currentShuffle[0]];
    let adjusted = [...this.state.currentShuffle].slice(1);

    this.setState({
      currentShuffle: adjusted
    });

    setTimeout(() => {
      this.scoreCheck();
    }, 1000);
  };

  dealerHit = () => {
    console.log("dealer hit");
    let current = [...this.state.dealerHand, this.state.currentShuffle[0]];
    let adjusted = [...this.state.currentShuffle].slice(1);

    this.setState({
      dealerHand: current,
      currentShuffle: adjusted
    });

    setTimeout(() => {
      this.scoreCheck();
    }, 1000);

    setTimeout(() => {
      this.dealerTurn();
    }, 1500);
  };

  dealerTurn = () => {
    console.log("its the dealers turn");
    // console.log("variable d: " + d);
    if (this.state.dealerPoints < 17) {
      this.dealerHit();
      //soft 17
    } else if (this.state.dealerPoints >= 17) {
      this.dealerStayed();
    }
    //  else if (this.state.dealerPoints === 17 && dealerAceCount > 0) {
    //   this.dealerHit();
    // }
  };

  dealerStayed = () => {
    console.log("dealer stayed!");
    this.setState({
      dealerStand: true
    });
    setTimeout(() => {
      this.scoreCheck();
    }, 1500);
  };

  playerStand = () => {
    console.log("player Stood!");
    this.setState({
      firstDeal: true
    });

    this.dealerTurn();
  };

  secPlayerStand = () => {
    //still need to hide buttons after stand
    console.log("split hand stayed");
    this.setState({
      secHandStand: true,
      firstDeal: false
    });
  };

  //Need to take away ability to double and ability to split after 3rd card
  playerDouble = () => {
    console.log("player Doubled!");
    let doubled = this.state.currentBet * 2;
    let adjusted = this.state.chipStack - this.state.betInPlay;
    this.playerHit();
    this.setState({
      betInPlay: doubled,
      chipStack: adjusted,
      firstDeal: true
    });
    setTimeout(() => {
      this.playerStand();
    }, 1500);
  };

  playerSplit = () => {
    console.log("Player Split");
    let first = [];
    let second = [];
    first.push(this.state.playerHand[0]);
    second.push(this.state.playerHand.pop());
    let updatedBet = this.state.betInPlay * 2;
    let updatedChips = this.state.chipStack - this.state.currentBet;
    this.setState({
      splitSelected: true,
      showSplit: false,
      firstDeal: true,
      playerHand: first,
      secondPlayerHand: second,
      betInPlay: updatedBet,
      chipStack: updatedChips
    });
  };

  playerWin = () => {
    alert("player Win ran");

    var updated = this.state.betInPlay * 2 + this.state.chipStack;

    this.setState({
      chipStack: updated
    });
    this.resetGame();
  };

  playerLose = () => {
    alert("player Lose ran");
    this.resetGame();
  };

  playerPush = () => {
    alert("player push ran");
    var updated = this.state.betInPlay + this.state.chipStack;
    this.setState({
      chipStack: updated
    });
    this.resetGame();
  };

  resetGame = () => {
    if (this.state.currentShuffle.length < 10) {
      this.shuffle();
    } else {
      this.setState({
        dealerHand: [],
        playerHand: [],
        secondPlayerHand: [],
        dealerPoints: null,
        playerPoints: null,
        secPlayerPoints: null,
        secHandStand: false,
        currentBet: "",
        betInPlay: 0,
        hideBetDiv: false,
        showSplit: false,
        splitSelected: false,
        firstDeal: true,
        dealerTurn: false,
        dealerStand: false
      });
    }
  };

  roundOver = () => {
    if (this.state.playerPoints > 21) {
      alert("You Lost");
      this.playerLose();
    } else if (this.state.dealerPoints > 21 && this.state.playerPoints <= 21) {
      alert("you win!");
      this.playerWin();
    } else if (this.state.dealerPoints > this.state.playerPoints) {
      alert("you lost!");
      this.playerLose();
    } else if (this.state.playerPoints > this.state.dealerPoints) {
      alert("you win");
      this.playerWin();
    } else if (this.state.playerPoints === this.state.dealerPoints) {
      alert("PUSH");
      this.playerPush();
    }
  };

  render() {
    const toggleSit = this.state.isSit ? { visibility: "hidden" } : {};
    const betDivStyle = this.state.hideBetDiv ? { visibility: "hidden" } : {};
    const splitButtStyle = this.state.showSplit ? {} : { visibility: "hidden" };
    const splitDivStyle = this.state.splitSelected
      ? {}
      : { visibility: "hidden" };
    const secButtHide = this.state.secHandStand ? { visibility: "hidden" } : {};
    const hitButtonAvail = this.state.firstDeal ? { visibility: "hidden" } : {};
    return (
      <>
        <div className="container container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="table-visual">
                <div className="dealerPos">
                  <div>
                    {this.state.dealerHand.map((card, i) => {
                      return <Card key={i} val={card.val} suit={card.suit} />;
                    })}
                  </div>
                </div>
                <div className="posOne">
                  <Button
                    style={hitButtonAvail}
                    bsclass="success"
                    className="hit-button"
                    onClick={this.playerHit}
                  >
                    Hit
                  </Button>
                  <Button
                    style={hitButtonAvail}
                    bsclass="success"
                    className="stand-button"
                    onClick={this.playerStand}
                  >
                    Stand
                  </Button>
                  <Button
                    style={hitButtonAvail}
                    bsclass="success"
                    className="double-button"
                    onClick={this.playerDouble}
                  >
                    Double
                  </Button>
                  <Button
                    style={splitButtStyle}
                    bsclass="success"
                    className="split-button"
                    onClick={this.playerSplit}
                  >
                    Split
                  </Button>
                  <div className="chipCount">{this.state.chipStack}</div>
                  <div>
                    {this.state.playerHand.map((card, i) => {
                      return <Card key={i} val={card.val} suit={card.suit} />;
                    })}
                  </div>
                  <div className="betOne betDiv">betOne</div>
                  {/* <Button bsclass="success" onClick={() => this.placeBet()}>
                    Place Bet
                  </Button> */}
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
                      <button onClick={this.handleSubmit}>BET</button>
                    </form>
                  </div>
                  {/* () => this.shuffle() */}
                  <div className="sitButt">
                    <Button
                      bsclass="success"
                      style={toggleSit}
                      onClick={this.takeSeat}
                    >
                      SIT
                    </Button>
                  </div>
                </div>
                <div className="posTwo" style={splitDivStyle}>
                  <Button
                    style={secButtHide}
                    bsclass="success"
                    className="hit-button"
                    onClick={this.playerHit}
                  >
                    Hit
                  </Button>
                  <Button
                    style={secButtHide}
                    bsclass="success"
                    className="stand-button"
                    onClick={this.secPlayerStand}
                  >
                    Stand
                  </Button>
                  <Button
                    style={secButtHide}
                    bsclass="success"
                    className="double-button"
                    onClick={this.playerDouble}
                  >
                    Double
                  </Button>
                  <div>
                    {this.state.secondPlayerHand.map((card, i) => {
                      return <Card key={i} val={card.val} suit={card.suit} />;
                    })}
                  </div>
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

const Card = ({ val, suit }) => {
  const combo = val ? `${val}${suit}` : null;
  const color = suit === "♦" || suit === "♥" ? "card-red" : "card";

  return (
    <td>
      <div className={color}>{combo}</div>
    </td>
  );
};

export default Table;
