function theGame() {
  var theDeck = [];
  var currentShuffle = [];
  var dealtCards = [];
  var dealerHand = [];
  var currentDealerPoints = 0;

  var playerHand = [];
  var currentPlayerPoints = 0;

  //my incorporate player turn for variable players
  //   var playerTurn = true;
  var playerStay = false;
  var dealerStay = false;

  function makeDeck() {
    function card(suit, val) {
      this.name = `${val} of ${suit}`;
      (this.suit = suit), (this.val = val);
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
        theDeck.push(new card(suits[j], values[i]));
      }
    }
    console.log("...generating deck");
  }

  function shuffle() {
    var sample = [...theDeck];
    var shuffled = [];
    while (shuffled.length < 52) {
      var randIndex = Math.floor(Math.random() * 52);
      var current = sample[randIndex];
      if (shuffled.indexOf(current) < 0) {
        shuffled.push(current);
      }
    }
    console.log(shuffled);

    currentShuffle = shuffled;
  }

  function flopLoss() {
    console.log("OUCH dealer dealt 21");
  }

  function busted() {
    console.log("BUSTED, the dealer won!");
  }

  function youLose() {
    console.log("You lost!");
  }

  function tablePush() {
    console.log("You pushed!");
  }

  function youWin() {
    console.log("You won the hand!");
    //add chips to stack,
    //reset all values (can use a general function that resets all)
  }

  //dealer functions

  function dealerHit() {
    console.log("the dealer hit!");
    dealerHand.push(currentShuffle[0]);
    console.log(dealerHand);
    currentShuffle = currentShuffle.slice(1);
    scoreCheck();
    if (dealerStay === false) {
      dealerTurn();
    }
  }

  function dealerStayed() {
    console.log("the dealer stayed!");
    dealerStay = true;
    scoreCheck();
  }
  function dealerTurn() {
    console.log("dealer turn");
    if (currentDealerPoints < 17) {
      dealerHit();
      //soft 17
    } else if (currentDealerPoints === 17 && dealerAceCount > 0) {
      dealerHit();
    } else if (currentDealerPoints >= 17) {
      dealerStayed();
    }
  }

  //players turns
  function playerHit() {
    // must be tied to button HIT
    console.log("the player hit!");
    playerHand.push(currentShuffle[0]);
    currentShuffle = currentShuffle.slice(1);
    scoreCheck();
  }

  function playerClickedStay() {
    console.log("player clicked stay");
    playerStay = true;
    dealerTurn();
  }

  function roundOver() {
    console.log("round over!");
    if (currentPlayerPoints > 21) {
      youLose();
    } else if (
      currentDealerPoints > currentPlayerPoints &&
      currentDealerPoints < 22
    ) {
      youLose();
    } else if (
      currentDealerPoints < currentPlayerPoints &&
      currentPlayerPoints < 22
    ) {
      youWin();
    } else if (
      currentDealerPoints > currentPlayerPoints &&
      currentDealerPoints > 21
    ) {
      youWin();
    } else if (currentDealerPoints === currentPlayerPoints) {
      tablePush();
    }
  }

  function scoreCheck() {
    var newDealerPoints = 0;
    var newPlayerPoints = 0;
    var newDealerAceCount = 0;
    var newPlayerAceCount = 0;

    for (var i = 0; i < dealerHand.length; i++) {
      if (
        dealerHand[i].val === "J" ||
        dealerHand[i].val === "Q" ||
        dealerHand[i].val === "K"
      ) {
        newDealerPoints += 10;
      } else if (dealerHand[i].val === "A") {
        newDealerPoints += 11;
        newDealerAceCount++;
      } else {
        newDealerPoints += parseInt(dealerHand[i].val);
      }
    }

    for (var i = 0; i < playerHand.length; i++) {
      if (
        playerHand[i].val === "J" ||
        playerHand[i].val === "Q" ||
        playerHand[i].val === "K"
      ) {
        newPlayerPoints += 10;
      } else if (playerHand[i].val === "A") {
        newPlayerPoints += 11;
        newPlayerAceCount++;
      } else {
        newPlayerPoints += parseInt(playerHand[i].val);
      }
    }

    //check for ace value adjustment
    if (newDealerPoints > 21 && newDealerAceCount > 0) {
      while (newDealerAceCount > 0 && newDealerPoints > 21) {
        newDealerPoints -= 10;
        newDealerAceCount--;
      }
    }

    if (newPlayerPoints > 21 && newPlayerAceCount > 0) {
      while (newPlayerAceCount > 0 && newPlayerPoints > 21) {
        newPlayerPoints -= 10;
        newnewPlayerAceCount--;
      }
    }

    currentDealerPoints = newDealerPoints;
    currentPlayerPoints = newPlayerPoints;
    playerAceCount = newPlayerAceCount;
    dealerAceCount = newDealerAceCount;
    console.log("current player score SCORECHECK: " + currentPlayerPoints);
    console.log("current dealer score SCORECHECK: " + currentDealerPoints);

    if (currentPlayerPoints > 21 && playerAceCount === 0) {
      playerStay = true;
    }

    if (currentDealerPoints > 21 && dealerAceCount === 0) {
      dealerStay = true;
    }

    if (dealerStay === true && playerStay === true) {
      console.log("dealer and player both stayed");
      roundOver();
    }
    // initial deal edge cases
    if (
      currentDealerPoints === 21 &&
      currentPlayerPoints < 21 &&
      dealerHand.length === 2
    ) {
      flopLoss();
    }

    if (currentDealerPoints === 21 && currentPlayerPoints === 21) {
      tablePush();
    }

    if (!playerStay) {
      playerClickedStay();
    }
  }

  function deal() {
    console.log("... dealing cards");
    playerHand.push(currentShuffle[0], currentShuffle[2]);
    dealerHand.push(currentShuffle[1], currentShuffle[3]);
    console.log("player: ");
    console.log(playerHand[0], playerHand[1]);
    console.log("dealer :");
    console.log(dealerHand[0], dealerHand[1]);
    currentShuffle = currentShuffle.slice(4);
    console.log(currentShuffle);
    console.log("checking for 21");
    scoreCheck();
  }

  console.log("game started");

  makeDeck();
  console.log("deck generated");

  if ((currentShuffle = [])) {
    console.log("No current shuffle, shuffling now");
    shuffle();
  }

  deal();
}

theGame();
