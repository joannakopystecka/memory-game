const cardsColor = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "brown",
  "brown",
  "yellow",
  "yellow",
  "orange",
  "orange",
  "violet",
  "violet",
  "lightgreen",
  "lightgreen",
];

let cards = document.querySelectorAll(".card");
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
  activeCard = this;

  if (activeCard === activeCards[0]) return;

  activeCard.classList.remove("hidden");

  //check if 1 click
  if (activeCards.length === 0) {
    console.log("1");
    activeCards[0] = activeCard;
    return;
  }
  //check if 2 click
  else {
    console.log("2");
    cards.forEach((card) => card.removeEventListener("click", clickCard));
    activeCards[1] = activeCard;

    setTimeout(function () {
      //check if they are the same cards - win
      if (activeCards[0].className === activeCards[1].className) {
        console.log("win");
        activeCards.forEach((card) => card.classList.add("off"));
        gameResult++;
        cards = cards.filter((card) => !card.classList.contains("off"));
        //check if the game is over
        if (gameResult === gamePairs) {
          console.log("WIN");
          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime) / 1000;
          document.querySelector(
            ".win"
          ).textContent = `You won! Your time: ${gameTime} seconds`;
        }
      }
      //lost, hide cards again
      else {
        console.log("przegrana");
        activeCards.forEach((card) => card.classList.add("hidden"));
      }
      //reset
      activeCard = "";
      activeCards.length = 0;
      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 500);
  }
};

const init = function () {
  cards.forEach((card) => {
    //random card
    const position = Math.floor(Math.random() * cardsColor.length);
    //card assignment
    card.classList.add(cardsColor[position]);
    //removing the already drawn card
    cardsColor.splice(position, 1);
  });

  setTimeout(function () {
    cards.forEach((card) => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard);
    });
  }, 1000);
};

init();
