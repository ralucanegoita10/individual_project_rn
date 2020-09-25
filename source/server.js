/* Import express */
const express = require('express');

const fs = require('fs').promises;

/* Create express server instance */
const app = express();

app.use(express.static('./source/frontend'));
app.use(express.json());

let turnCount = 0;

const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

/* Reads from file and adds contents to global variable 'scores' */
async function readScores() {
  const rawData = await fs.readFile('./source/data/game.json', 'utf-8');

  const scores = JSON.parse(rawData);

  return scores;
}

/* Selects the element of the file that matches the given player
   and updates its score */
async function updateScore(player) {
  try {
    const scoreObtained = await readScores();

    const playerObj = scoreObtained.find((item) => item.player === player);

    playerObj.score += 1;

    await fs.writeFile('./source/data/game.json', JSON.stringify(scoreObtained, null, '  '), 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

function isPositionTaken(_board, xPos, yPos) {
  if (xPos === undefined || yPos === undefined) {
    throw new Error('Argument undefined');
  }

  return _board[yPos][xPos] !== 0;
}

function dropToBottom(_board, xPos, freePos) {
  // Start at the bottom of the column, and step up, checking to make sure
  // each position has been filled. If one hasn't, return the empty position.
  for (let j = _board.length - 1; j >= 0; j -= 1) {
    if (!isPositionTaken(_board, xPos, j)) {
      freePos = j;
      return freePos;
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

  return _board;
}

function findMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 0 && one !== undefined);
}

async function horizontalWinCheck(_board, turnCount) {
  for (let row = 0; row < _board.length; row += 1) {
    for (let col = 0; col < _board[row].length - 3; col += 1) {
      if (findMatch(_board[row][col], _board[row][col + 1],
        _board[row][col + 2], _board[row][col + 3])) {
        if (turnCount % 2 === 1) {
          await updateScore(1);
          return 1;
        }
        await updateScore(2);
        return 2;
      }
    }
  }
  return -1;
}

async function verticalWinCheck(_board, turnCount) {
  for (let row = 0; row < _board.length - 3; row += 1) {
    for (let col = 0; col < _board[row].length; col += 1) {
      if (findMatch(_board[row][col], _board[row + 1][col],
        _board[row + 2][col], _board[row + 3][col])) {
        if (turnCount % 2 === 1) {
          await updateScore(1);
          return 1;
        }
        await updateScore(1);
        return 2;
      }
    }
  }
  return -1;
}

app.get('/get-board', async (req, res) => {
  const scores = await readScores();
  res.json({
    board,
    scores,
  });
});

app.post('/game/column/:column', (req, res) => {
  const freePos = 0;
  const row = dropToBottom(board, req.params.column, freePos);

  if (row === -1) {
    res.json({
      board,
      player: 1,
    });
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
  res.json({
    board: resetGame(board),
    // player: turnCount % 2 === 0 ? 1 : 2,
    player: 1,
  });
});

app.get('/game/winner', async (req, res) => {
  await readScores();
  const horizontalWinner = await horizontalWinCheck(board, turnCount);
  const verticalWinner = await verticalWinCheck(board, turnCount);

  if (horizontalWinner !== -1) {
    await updateScore(horizontalWinner);

    res.json({
      winner: horizontalWinner,
      gameEnded: true,
      scores,
    });
  } else if (verticalWinner !== -1) {
    await updateScore(verticalWinner);
    res.json({
      winner: verticalWinner,
      gameEnded: true,
      scores,
    });
  } else {
    res.json({
      winner: null,
      gameEnded: false,
      scores,
    });
  }
});

/* Start the server */
if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${8080}...`);
  });
}

module.exports = {
  readScores,
  updateScore,
  isPositionTaken,
  dropToBottom,
  resetGame,
  findMatch,
  horizontalWinCheck,
  verticalWinCheck,
  app,
};
