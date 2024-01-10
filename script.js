const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🦆",
  "🦉",
  "🦅",
  "🦇",
  "🐺",
];

const gameContainer = document.querySelector(".game-container");
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let lockBoard = false;

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createBoard() {
  const shuffledEmojis = shuffle([...emojis, ...emojis]);

  for (let i = 0; i < shuffledEmojis.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card-container");
    card.dataset.emoji = shuffledEmojis[i];

    const cardBefore = document.createElement("div");
    cardBefore.classList.add("card-before");

    const cardAfter = document.createElement("div");
    cardAfter.classList.add("card-after");

    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.textContent = shuffledEmojis[i];

    cardAfter.appendChild(emoji);
    card.appendChild(cardBefore);
    card.appendChild(cardAfter);
    gameContainer.appendChild(card);

    card.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
