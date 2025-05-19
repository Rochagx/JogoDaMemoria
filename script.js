const cardsContent = [
  ["Mahatma Gandhi", "Líder pacifista da independência da Índia"],
  ["Apartheid", "Segregação racial na África do Sul"],
  ["Conferência de Bandung", "Encontro afro-asiático contra o colonialismo"],
  ["Nelson Mandela", "Líder contra o apartheid na África do Sul"],
  ["Descolonização da Ásia", "Independência após a Segunda Guerra"],
  ["Pan-africanismo", "União dos povos africanos"],
  ["Independência da Argélia", "Conflito contra a França (1954-1962)"],
  ["Guerra da Indochina", "Luta do Vietnã contra a França"],
  ["Kwame Nkrumah", "Líder da independência de Gana"],
  ["Descolonização", "Libertação do domínio europeu"]
];

let gameBoard = document.getElementById("game-board");
let movesCounter = document.getElementById("moves");
let timerDisplay = document.getElementById("timer");
let message = document.getElementById("message");

let cards = [];
let flippedCards = [];
let matched = 0;
let moves = 0;
let seconds = 0;
let interval;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function startTimer() {
  clearInterval(interval);
  seconds = 0;
  interval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `Tempo: ${seconds}s`;
  }, 1000);
}

function createCard(text, pairId) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.pairId = pairId;
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${text}</div>
    </div>`;
  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (
    card.classList.contains("flipped") ||
    flippedCards.length === 2 ||
    matched === cards.length / 2
  ) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesCounter.textContent = `Movimentos: ${moves}`;
    const [first, second] = flippedCards;
    if (first.dataset.pairId === second.dataset.pairId) {
      matched++;
      flippedCards = [];
      if (matched === cards.length / 2) {
        clearInterval(interval);
        message.textContent = `🎉 Você venceu em ${moves} movimentos e ${seconds}s!`;
      }
    } else {
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

function initGame() {
  message.textContent = "";
  gameBoard.innerHTML = "";
  matched = 0;
  moves = 0;
  movesCounter.textContent = "Movimentos: 0";
  startTimer();

  cards = [];
  flippedCards = [];

  cardsContent.forEach((pair, index) => {
    const [a, b] = pair;
    cards.push(createCard(a, index));
    cards.push(createCard(b, index));
  });

  cards = shuffle(cards);
  cards.forEach(card => gameBoard.appendChild(card));
}

function restartGame() {
  clearInterval(interval);
  initGame();
}

window.onload = initGame;
