/*const Game = {

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

function takeTurn(boardLocationDiv) {
  // change turn when a loc on board is clicked
  boardLocationDiv.addEventListener('click', () => {
    boardLocationDiv.style.backgroundColor = (player % 2 === 0 ? 'red' : 'yellow');
    player++;
  });
}


function addDiscToBoard(x_pos, y_pos) {
  board[y_pos][x_pos] = 'yellow';
}

/**
 * Print the contents of board to the html page.
 */
/*
function printBoard() {
  let row;
  let cell;

  for (let j = 0; j <= Game.boardHeight; j++) {
    for (let i = 0; i <= Game.boardLength; i++) {
      if (isPositionTaken(i, j)) {
        row = document.querySelector(`tr:nth-child(${1 + j})`);
        cell = row.querySelector(`td:nth-child(${1 + i})`);
        cell.firstElementChild.classList.add(board[j][i]);
      }
    }
  }
}



// General-purpose status checks for the game.
function isPositionTaken(x_pos, y_pos) {
  return board[y_pos][x_pos] !== 0;
}

function isGameADraw() {
  for (let y = 0; y <= Game.boardHeight; y++) {
    for (let x = 0; x <= Game.boardLength; x++) {
      if (!isPositionTaken(x, y)) {
        return false;
      }
    }
  }
  return true;
}

function isHorizontalWin() {}

function isVerticalWin() {}
*/