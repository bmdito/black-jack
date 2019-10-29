import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import spades from "../../assets/images/ace-of-spades.jpg";
import hiddenCard from "../../assets/images/card-back.png";
import "./style.css";
import Modal from "react-modal";
import Withdrawal from "../Withdrawal/index";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";
import decode from "jwt-decode";
import API from "../../utils/API";

const widModal = ({ onRequestClose, ...otherProps }) => (
  <div className="modal-wrapper">
    <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
      {/* <button onClick={onRequestClose}>close</button> */}

      <Withdrawal />
    </Modal>
  </div>
);

class Table extends Component {
  state = {
    theDeck: [],
    currentShuffle: [],
    dealerHand: [],
    playerHand: [],
    firstHandDealer: [],
    secondPlayerHand: [],
    dealerPoints: null,
    playerPoints: null,
    secPlayerPoints: null,
    secHandStand: false,
    currentBet: undefined,
    currentPlayerName: "",
    chipsAfterWithdrawal: null,
    chipStack: null,
    betInPlay: 0,
    hideBetDiv: true,
    showSplit: false,
    splitSelected: false,
    firstDeal: true,
    dealerTurn: false,
    dealerStand: false,
    isSit: false,
    isDealt: false,
    showStandUp: false
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

  // activates on sit
  takeSeat = () => {
    console.log("SAT DOWN");
    const buyIn = localStorage.getItem("funds");
    const sitName = localStorage.getItem("name");
    const remaining = localStorage.getItem("diff");

    this.setState({
      hideBetDiv: false,
      isSit: true,
      chipStack: buyIn,
      currentPlayerName: sitName,
      chipsAfterWithdrawal: remaining
    });
    // this.promptBuyin();
    this.shuffle();
  };

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
    this.setState({
      currentShuffle: shuffled
    });
    console.log(shuffled);
  };

  //Initial Deal
  deal = () => {
    console.log("you clicked deal!");
    console.log("... dealing cards");
    var playerDealt = [];
    var dealerDealt = [];
    var firstDealer = [];
    var cards = this.state.currentShuffle;
    playerDealt.push(cards[0], cards[2]);
    dealerDealt.push(cards[1]);
    firstDealer.push(cards[3]);
    var updated = cards.slice(4);

    this.setState({
      playerHand: playerDealt,
      dealerHand: dealerDealt,
      firstHandDealer: firstDealer,
      currentShuffle: updated,
      showStandUp: false,
      isDealt: true
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
      this.roundOver();
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
    // console.log("dealer hand " + this.state.dealerHand[0]);
    // console.log("dealer hand " + this.state.dealerHand[1]);
    // console.log("player hand " + this.state.playerHand[0]);
    // console.log("player hand " + this.state.playerHand[1]);
    // console.log("current shuffle " + this.state.currentShuffle);
    // console.log("first hand dealer " + this.state.firstHandDealer[0]);
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
    let newDealer = [];
    newDealer.push(this.state.dealerHand);
    newDealer.push(this.state.firstHandDealer);
    this.setState({
      firstDeal: true,
      dealerHand: newDealer,
      dealerTurn: true
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

  standUpFromTable = () => {
    alert("player stood up!");
    var token = localStorage.getItem("x-auth-token");
    var decoded = decode(token);
    var id = decoded.user.id;
    const finalChips =
      parseInt(this.state.chipsAfterWithdrawal) +
      parseInt(this.state.chipStack);
    console.log(finalChips);
    API.updatedChips({ id, finalChips }).then(res => {
      // updated info used here.
      console.log(res);
    });
    localStorage.removeItem("funds");
    this.setState({
      hideBetDiv: true,
      isSit: false,
      showStandUp: false
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
        dealerStand: false,
        isDealt: false,
        showStandUp: true
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
    const toggleSit =
      localStorage.getItem("funds") && this.state.isSit === false
        ? {}
        : { visibility: "hidden" };
    const nameTag =
      localStorage.getItem("funds") && this.state.isSit === true
        ? {}
        : { visibility: "hidden" };

    const toggleBuy = localStorage.getItem("funds")
      ? { visibility: "hidden" }
      : {};
    const betDivStyle = this.state.hideBetDiv ? { visibility: "hidden" } : {};
    const splitButtStyle = this.state.showSplit ? {} : { visibility: "hidden" };
    const splitDivStyle = this.state.splitSelected
      ? {}
      : { visibility: "hidden" };
    const secButtHide = this.state.secHandStand ? { visibility: "hidden" } : {};
    const hitButtonAvail = this.state.firstDeal ? { visibility: "hidden" } : {};
    const standUpStyle = this.state.showStandUp ? {} : { visibility: "hidden" };
    const thatHiddenCard =
      this.state.dealerTurn || this.state.isDealt === false
        ? { visibility: "hidden" }
        : {};
    return (
      <>
        <div className="container-fluid">
          <div className="background-img-table">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
                <div className="table-visual">
                  <div>
                    <img className="table-img" src={spades} />
                  </div>
                  <div className="dealerPos">
                    <div>
                      {this.state.dealerHand.map((card, i) => {
                        return <Card key={i} val={card.val} suit={card.suit} />;
                      })}
                    </div>

                    <div className="hideCard" style={thatHiddenCard}>
                      <img src={hiddenCard} />
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

                    <Button
                      style={standUpStyle}
                      className="standUpButt"
                      onClick={this.standUpFromTable}
                    >
                      StandUp
                    </Button>

                    {/* Show information on Sitting Player */}
                    <div className="playerInfo" style={nameTag}>
                      <div className="sitAvatar"></div>
                      <div className="playerName">
                        {this.state.currentPlayerName}
                      </div>
                      <div className="chipCount">{this.state.chipStack}</div>
                    </div>
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
                    <ModalProvider>
                      <ModalRoot />
                      <ModalConsumer>
                        {({ showModal }) => (
                          <Fragment>
                            <button
                              className="buyButt"
                              style={toggleBuy}
                              // style={}
                              onClick={() => {
                                showModal(widModal);
                              }}
                            >
                              <span>Buy In</span>
                            </button>
                          </Fragment>
                        )}
                      </ModalConsumer>
                    </ModalProvider>
                    <div className="sitButt">
                      <Button
                        bsclass="success"
                        style={toggleSit}
                        onClick={this.takeSeat}
                      >
                        Take Seat!
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

const theHiddenCard = () => {
  return (
    <div className="hideCard">
      <img src={hiddenCard} />
    </div>
  );
};

export default Table;
