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
    for (let j = 0; j < _board.length; j += 1) {
      _board[i][j] = 0;
    }
  }
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


/*
app.get('/reset', (req, res) => {
  tryThis();
  res.json(board);
});

app.get = ('/hello', (req, res) => {
  res.send('world');
});
*/

/* Start the server */
app.listen(8080);
