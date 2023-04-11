'use strict';

let currentScore = Number(
  document.querySelector('.player--active .current-score').textContent
);

let storedScore = 0;

// let heldScore1 = Number(
//   document.querySelector('.player--0 .score').textContent
// );

// let heldScore2 = Number(
//   document.querySelector('.player--1  .score').textContent
// );

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

    currentScore = 0;
    setTextNum('.player--active .current-score', currentScore);

    switchPlayer();
  }
}

// function updateSavedScore2() {
//   if (currentScore != 0) {
//     if (
//       document.querySelector('.player--active').classList.contains('player--0')
//     ) {
//       heldScore1 += currentScore;
//       setTextNum('.player--active .score', heldScore1);
//       if (document.querySelector('.player--active .score').textContent >= 10) {
//         console.log('winner!');
//       }
//     }

//     if (
//       document.querySelector('.player--active').classList.contains('player--1')
//     ) {
//       heldScore2 += currentScore;
//       setTextNum('.player--active .score', heldScore2);
//       if (document.querySelector('.player--active .score').textContent >= 10) {
//         console.log('winner!');
//       }
//     }
//     currentScore = 0;
//     setTextNum('.player--active .current-score', currentScore);

//     switchPlayer();
//   }
// }

// function saveScore() {
//   if (currentScore != 0) {
//     console.log(heldScore);
//     heldScore += currentScore;
//     console.log(heldScore);
//     setTextNum('.player--active .score', heldScore);
//     currentScore = 0;
//     // ---BUG--- this is currently replacing the score each time instead of adding to it
//     heldScore = 0;
//     console.log(heldScore);
//     // ---BUG--- without heldScore reset to zero, both sides accumulate in one- make into loop for each half?
//     setTextNum('.player--active .current-score', currentScore);
//     console.log(heldScore);
//     switchPlayer();
//     console.log(heldScore);
//   }
// }

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

clickListen('.btn--roll', rollDie);

clickListen('.btn--hold', saveScore);

clickListen('.btn--new', startOver);
