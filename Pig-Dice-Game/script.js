'use strict';

let currentScore = Number(
  document.querySelector('.player--active .current-score').textContent
);

let storedScore = 0;

const players = document.querySelectorAll('.player');

function setTextNum(numberPlacement, newNumber) {
  document.querySelector(`${numberPlacement}`).textContent = newNumber;
}

function clickListen(btnClicked, handleClick) {
  document.querySelector(btnClicked).addEventListener('click', handleClick);
}

function rollDie() {
  const roll = Number(Math.trunc(Math.random() * 6) + 1);
  const dieNum = `dice-${roll}.png`;
  document.querySelector('.dice').setAttribute('src', dieNum);

  // ---NOTE--- ternary operator prob wont work here because it's more than just setting the currentscore, probably also switching player or declaring winner within: currentScore = roll === 1 ? 0 : currentScore += roll;

  if (roll === 1) {
    currentScore = 0;
    setTextNum('.player--active .current-score', currentScore);
    switchPlayer();
  } else {
    currentScore += roll;
    setTextNum('.player--active .current-score', currentScore);
  }
}

function switchStoredScore() {
  storedScore = Number(
    document.querySelector('.player--active .score').textContent
  );
  return storedScore;
}

function saveScore() {
  if (currentScore != 0) {
    storedScore += currentScore;
    setTextNum('.player--active .score', storedScore);

    if (storedScore >= 100) {
      winner();
    }

    currentScore = 0;
    setTextNum('.player--active .current-score', currentScore);

    switchPlayer();
  }
}

function switchPlayer() {
  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle('player--active');
  }
  switchStoredScore();
}

function startOver() {
  // location.reload();

  storedScore = 0;
  currentScore = 0;

  for (let i = 0; i < players.length; i++) {
    setTextNum(`.player--${i} .score`, storedScore);
    setTextNum(`.player--${i} .current-score`, currentScore);

    document.querySelector(`.player--${i}`).classList.remove('player--active');
  }

  document.querySelector('.player--0').classList.add('player--active');
  // document.querySelector('.player--1').classList.remove('player--active');
}

function winner() {
  let winningPlayer = document.querySelector(
    '.player--active .name'
  ).textContent;
  alert(`${winningPlayer} wins!`);
  startOver();
}

clickListen('.btn--roll', rollDie);

clickListen('.btn--hold', saveScore);

clickListen('.btn--new', startOver);
