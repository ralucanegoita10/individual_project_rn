/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */
let player = 0;

const Game = {

  firstPlayer: 'yellow',
  takenMsg: 'This position is already taken. Please make another choice.',
  drawMsg: 'This game is a draw.',
  winMsg: 'The winner is: ',
  countToWin: 4,
  boardLength: 6,
  boardHeight: 5,
};

// null
const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function getBoard() {
  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      $(`#row-${i}-column-${j}`).css('background-color', 'white');
      $(`#row-${i}-column-${j}`)[0].parentNode.style.backgroundColor = 'blue';
      // document.getElementById("row-" + i + "-column-" + j).style.backgroundColor = "white";
      // document.getElementById("row-" + i + "-column-" + j).parentNode.style.backgroundColor = "blue"
      // console.log(document.getElementById("row-0-column-0"));
    }
  }
}
let player1;
let player1Value;
let player2;
let player2Value;

function resetBoard() {
  player = 0;

  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      board[i][j] = 0;
      $(`#row-${i}-column-${j}`).css('background-color', 'white');
    }
  }
  player1 = 'red';

  /* Start with Player One */

  $('h3').text(`${player1}: it is your turn, please pick a column to drop your red chip.`);

  setTimeout(() => {
    player1 = prompt('Player One: Enter Your Name , you will be Red');
    player1Value = 1;

    player2 = prompt('Player Two: Enter Your Name, you will be Yellow');
    player2Value = 2;
  }, 0);
}

// This functions puts red/yellow pieces in game board on button click
function itemOnClick() {
  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      $(`#row-${i}-column-${j}`).click(() => {
        const empty = dropToBottom(j);
        if (empty === -1) {
          return;
        }

        // board[empty][j] = 1;

        if (player % 2 === 0) {
          /* Start with Player One */
          $('h3').text(`${player2}: it is your turn, please pick a column to drop your chip.`);
          $(`#row-${empty}-column-${j}`).css('background-color', 'red');
          board[empty][j] = 1;
          player += 1;
        } else {
          /* Start with Player Two */
          $('h3').text(`${player1}: it is your turn, please pick a column to drop your chip.`);
          $(`#row-${empty}-column-${j}`).css('background-color', 'yellow');
          board[empty][j] = 2;
          player += 1;
        }

        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
          console.log('we have a winner: ');

        }
      });
    }
  }
}

// General-purpose status checks for the game.
function isPositionTaken(xPos, yPos) {
  return board[yPos][xPos] !== 0;
}

function dropToBottom(xPos) {
  // Start at the bottom of the column, and step up, checking to make sure
  // each position has been filled. If one hasn't, return the empty position.
  for (let j = Game.boardHeight; j >= 0; j -= 1) {
    if (!isPositionTaken(xPos, j)) {
      // console.log(`j= ${j} x= ${xPos}`);
      return j;
    }
  }
  return -1;
}

function isGameADraw() {
  for (let j = 0; j <= Game.boardHeight; j += 1) {
    for (let i = 0; i <= Game.boardLength; i += 1) {
      if (!isPositionTaken(i, j)) {
        return false;
      }
    }
  }
  return true;
}

function findMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 0 && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (let row = 0; row < 6; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      if (findMatch(board[row][col], board[row][col + 1],
        board[row][col + 2], board[row][col + 3])) {
        console.log('horizontal');
        reportWin(row, col);
        return true;
      }
      continue;
    }
  }
}

function verticalWinCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      if (findMatch(board[row][col], board[row + 1][col],
        board[row + 2][col], board[row + 3][col])) {
        console.log('vertical');
        reportWin(row, col);
        return true;
      }
      continue;
    }
  }
}

// doesnt work!
/*
function diagonalWinCheck() {
  for (let col = 0; col < 5; col += 1) {
    for (let row = 0; row < 7; row += 1) {
      if (findMatch(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) {
        console.log('diag');
        reportWin(row, col);
        return true;
      } if (row > 3 && col < 3) {
        if (findMatch(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) {
          console.log('diag');
          reportWin(row, col);
          return true;
        }
      }
      continue;
    }
  }
}
*/

function reportWin(rowNum, colNum) {
  console.log(`You won. The row: ${rowNum} and the col: ${colNum}`);

}

function gameEnd(winningPlayer) {
  for (let col = 0; col < 7; col += 1) {
    for (let row = 0; row < 7; row += 1) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(`${winningPlayer} has won! Press "New game" to start again!`).css('fontSize', '50px');
    }
  }
}

/* Display the board game */
getBoard();
resetBoard();

let currentPlayer = 1;
let currentName = player1;

/* Display the button to reset game */
$(document).ready(() => {
  $('#new-game-btn').on('click', () => {
    resetBoard();
  });
});

/* Start the game */
itemOnClick();

$('.board button').on('click', () => {
  // Check for a win
  if (horizontalWinCheck() || verticalWinCheck()) { // || diagonalWinCheck()) {
    gameEnd(currentName);
  }

  // If no win or tie, continue to next player
  currentPlayer *= -1;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(`${currentName}: it is your turn, please pick a column to drop your red chip.`);
  } else {
    currentName = player2;
    $('h3').text(`${currentName}: it is your turn, please pick a column to drop your yellow chip.`);
  }
});
