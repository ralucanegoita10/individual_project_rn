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

const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

getBoard();
resetBoard();

app.post('/game', (req, res) => {
  res.text('Welcome to connect 4. please read the docs to find the right endpoints');
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
