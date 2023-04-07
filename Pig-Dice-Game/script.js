'use strict';

let currentScore = Number(document.querySelector('.current-score').textContent);

const setTextNum = function (numberPlacement, newNumber) {
  document.querySelector(`${numberPlacement}`).textContent = newNumber;
};
const clickListen = function (btnClicked, handleClick) {
  document.querySelector(btnClicked).addEventListener('click', handleClick);
};

clickListen('.btn--roll', rollDie);

function rollDie() {
  const roll = Number(Math.trunc(Math.random() * 6) + 1);
  const dieNum = `dice-${roll}.png`;
  document.querySelector('.dice').setAttribute('src', dieNum);

  // ---NOTE--- ternary operator prob wont work here because it's more than just setting the currentscore, probably also switching player or declaring winner within
  // currentScore = roll === 1 ? 0 : currentScore += roll;

  if (roll === 1) {
    currentScore = 0;

    // ---TODO--- SWITCH .player--active if class list contains, remove, if doesn't contain, add
  } else {
    currentScore += roll;

    // ---TODO--- set winner, not currentScore, but player's score
    // if (currentScore >= 100) {
    //   console.log('winner!');
    // }
  }
  setTextNum('.current-score', currentScore);
}

clickListen('.btn--hold', saveScore);

function saveScore() {
  let heldScore = Number(document.querySelector('.score').textContent);
  heldScore += currentScore;
  setTextNum('.player--active .score', heldScore);
  currentScore = 0;
}
