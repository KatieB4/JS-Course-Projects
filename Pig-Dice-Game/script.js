'use strict';

let currentScore = Number(document.querySelector('.current-score').textContent);

const setTextNum = function (numberPlacement, newNumber) {
  document.querySelector(`${numberPlacement}`).textContent = newNumber;
};

document.querySelector('.btn--roll').addEventListener('click', function () {
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

    // ---TODO--- set winner
    // if (currentScore >= 100) {
    //   console.log('winner!');
    // }
  }
  setTextNum('.current-score', currentScore);
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  let heldScore = Number(document.querySelector('.score').textContent);
  heldScore += currentScore;
  setTextNum('.player--active .score', heldScore);
  currentScore = 0;
});
