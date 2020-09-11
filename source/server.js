/* Import express */
const express = require('express');

/* Create express server instance */
const app = express();

app.use(express.static('./source/frontend'));
app.use(express.json());

const Game = {

  boardLength: 7,
  boardHeight: 6,
};

let turnCount = 0;

const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function isPositionTaken(_board, xPos, yPos) {
  return _board[yPos][xPos] !== 0;
}

function dropToBottom(_board, xPos) {
  // Start at the bottom of the column, and step up, checking to make sure
  // each position has been filled. If one hasn't, return the empty position.
  for (let j = _board.length - 1; j >= 0; j -= 1) {
    // change to board.height - 1 after changing the object
    if (!isPositionTaken(_board, xPos, j)) {
      return j;
    }
  }
  return -1;
}

function resetGame(_board) {
  turnCount = 0;

  for (let i = 0; i < _board.length; i += 1) {
    for (let j = 0; j < _board[i].length; j += 1) {
      _board[i][j] = 0;
    }
  }
}

function findMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 0 && one !== undefined);
}

function horizontalWinCheck(_board) {
  for (let row = 0; row < _board.length; row += 1) {
    for (let col = 0; col < _board[row].length - 3; col += 1) {
      if (findMatch(_board[row][col], _board[row][col + 1],
        _board[row][col + 2], _board[row][col + 3])) {
        if (turnCount % 2 === 1) {
          return 1;
        }
        return 2;
      }
    }
  }
  return -1;
}

function verticalWinCheck(_board) {
  for (let row = 0; row < _board.length - 3; row += 1) {
    for (let col = 0; col < _board[row].length; col += 1) {
      if (findMatch(_board[row][col], _board[row + 1][col],
        _board[row + 2][col], _board[row + 3][col])) {
        if (turnCount % 2 === 1) {
          return 1;
        }
        return 2;
      }
    }
  }
  return -1;
}

app.post('/game/column/:column', (req, res) => {
  const row = dropToBottom(board, req.params.column);

  if (row === -1) {
    return board;
  }

  if (turnCount % 2 === 0) {
    board[row][req.params.column] = 1;
  } else {
    board[row][req.params.column] = 2;
  }

  turnCount += 1;

  res.json({
    board,
    player: turnCount % 2 === 0 ? 1 : 2,
  });
});

app.post('/game/reset-game', (req, res) => {
  resetGame(board);
  res.json({
    board,
    player: turnCount % 2 === 0 ? 1 : 2,
  });
});

app.get('/game/winner', (req, res) => {
  const horizontalWinner = horizontalWinCheck(board);
  console.log(horizontalWinner);

  const verticalWinner = verticalWinCheck(board);
  console.log(verticalWinner);

  if (horizontalWinner !== -1) {
    res.json(horizontalWinner);
  } else if (verticalWinner !== -1) {
    res.json(verticalWinner);
  } else {
    res.json(-1);
  }
});

/* Start the server */
app.listen(8080);
