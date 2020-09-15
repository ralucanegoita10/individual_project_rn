/* Import express */
const express = require('express');

/* Create express server instance */
const app = express();

let scores;

app.use(express.static('./source/frontend'));
app.use(express.json());

const fs = require('fs').promises;

async function readScores() {
  const rawData = await fs.readFile('./source/data/game.json', 'utf-8');
  const parsedElement = JSON.parse(rawData);

  scores = parsedElement;
}

async function updateScore(player) {
  try {
    await readScores();

    const playerObj = scores.filter((item) => item.player === player)[0];

    playerObj.score += 1;

    await fs.writeFile('./source/data/game.json', JSON.stringify(scores, null, '  '), 'utf-8')
  } catch (err) {
    console.error(err);
  }
}

// app.put('/score/:score', async (req, res) => {
//   const score = req.params.score;
//   const updatedScore = req.body;
//   // should update the user with the given ID.
//   // If the user does not exist, return a 404 error code
//   updatedScore.score = score;
//   const players = JSON.parse( fs.readFile('data/game.json'));
//   /* const isValidUserId = users.some(u => u.userId === userId);

//   if (!isValidUserId) {
//       res.status(404).send('unknown user');
//       return;
//   }*/
//   const newData = [
//       ...users.filter(u => u.userId !== userId),
//       updatedUser,
//   ];
//   await fs.writeFile('data/users.json', JSON.stringify(newData), 'utf8');
//   res.status(200).send('ok')
// });





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

  // if (scores.player1 >= 10 && scores.player2 >= 10) {
  //   scores.player1 = 0;
  //   scores.player2 = 0;
  // }
  return _board;
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
          updateScore(1);
          return 1;
        }
        updateScore(2);
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
          updateScore(1);
          return 1;
        }
        updateScore(1);
        return 2;
      }
    }
  }
  return -1;
}

app.get('/get-board', (req, res) => {
  res.json({
    board,
    scores,
  });
});

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
  
  res.json({
    board: resetGame(board),
    player: turnCount % 2 === 0 ? 1 : 2,
  });
});

app.get('/game/winner', async (req, res) => {
  await readScores();
  const horizontalWinner = horizontalWinCheck(board);
  const verticalWinner = verticalWinCheck(board);

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
    res.json(-1);
  }
});

/* Start the server */
app.listen(8080);
