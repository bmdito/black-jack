function theGame() {
  var theDeck = [];
  var currentShuffle = [];
  var dealtCards = [];
  var dealerHand = [];
  var playerHand = [];

  function makeDeck() {
    // console.log(new person("john", "doe", "blue", 50));
    // const theDeck = [];
    // var currentShuffle;
    // var dealtCards = [];
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
    // console.log(theDeck);
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

  function deal() {
    // var theCard = currentShuffle[0];
    // dealtCards.push(theCard);
    // currentShuffle.shift();
    // console.log(theCard);
    // console.log(dealtCards);
    playerHand.push(currentShuffle[0], currentShuffle[2]);
    dealerHand.push(currentShuffle[1], currentShuffle[3]);
    console.log("player: ");
    console.log(playerHand[0], playerHand[1]);
    console.log("dealer :");
    console.log(dealerHand[0], dealerHand[1]);
    currentShuffle = currentShuffle.slice(4);
    console.log(currentShuffle);
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
