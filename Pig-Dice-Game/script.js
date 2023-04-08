'use strict';

let currentScore = Number(
  document.querySelector('.player--active .current-score').textContent
);

let heldScore = Number(
  document.querySelector('.player--active .score').textContent
);

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
    // ---TODO--- set winner, not with currentScore, but with player's score
    // console.log(document.querySelector('.player--active .score').textContent);
    // if (active player heldScore >= 10) {
    //   console.log('winner!');
    // }
    // console.log(
    //   typeof document.querySelector('.player--active .score').textContent
    // );
    // console.log(document.querySelector('.player--active .score').textContent);

    // if (document.querySelector('.player--active .score').textContent >= '10') {
    //   console.log('winner');
    // }
  }
}

// ---TODO--- make new function to update scores

function saveScore() {
  if (currentScore != 0) {
    heldScore += currentScore;
    setTextNum('.player--active .score', heldScore);
    // ---BUG--- this is currently replacing the score each time instead of adding to it
    currentScore = 0;
    heldScore = 0;
    setTextNum('.player--active .current-score', currentScore);
    switchPlayer();
  }
}

function switchPlayer() {
  for (let i = 0; i < players.length; i++) {
    // if (players[i].classList.contains('player--active')) {
    //   players[i].classList.remove('player--active');
    // } else {
    //   players[i].classList.add('player--active');
    // }
    players[i].classList.toggle('player--active');
  }
}

function startOver() {
  // location.reload();
  heldScore = 0;
  currentScore = 0;

  for (let i = 0; i < players.length; i++) {
    setTextNum(`.player--${[i]} .score`, heldScore);
    setTextNum(`.player--${[i]} .current-score`, heldScore);
  }

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
}

clickListen('.btn--roll', rollDie);

clickListen('.btn--hold', saveScore);

clickListen('.btn--new', startOver);
