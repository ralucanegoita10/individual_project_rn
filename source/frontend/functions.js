let turnCount = 0;
let currentPlayer;

const Game = {

  // firstPlayer: 'yellow',
  // takenMsg: 'This position is already taken. Please make another choice.',
  // drawMsg: 'This game is a draw.',
  // winMsg: 'The winner is: ',
  // countToWin: 4,
  boardLength: 7,
  boardHeight: 6,
};

let player1;
let player2;

function getBoard() {
  for (let i = 0; i < Game.boardHeight; i += 1) {
    for (let j = 0; j < Game.boardLength; j += 1) {
      $(`#row-${i}-column-${j}`).css('background-color', 'white');
      $(`#row-${i}-column-${j}`)[0].parentNode.style.backgroundColor = 'blue';
    }
  }
}


function findMatch(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 0 && one !== undefined);
}

function horizontalWinCheck(_board) {
  for (let row = 0; row < Game.boardLength - 1; row += 1) {
    for (let col = 0; col < Game.boardHeight - 2; col += 1) {
      if (findMatch(_board[row][col], _board[row][col + 1],
        _board[row][col + 2], _board[row][col + 3])) {
        return true;
      }
    }
  }
  return false;
}

function verticalWinCheck(_board) {
  for (let col = 0; col < Game.boardLength; col += 1) {
    for (let row = 0; row < Game.boardHeight - 3; row += 1) {
      if (findMatch(_board[row][col], _board[row + 1][col],
        _board[row + 2][col], _board[row + 3][col])) {
        return true;
      }
    }
  }
  return false;
}

function gameEnd(winningPlayer) {
  for (let col = 0; col < Game.boardLength; col += 1) {
    for (let row = 0; row < Game.boardLength; row += 1) {
      $('h3').hide();
      $('h2').hide();
      $('h1').text(`${winningPlayer} has won! Press "New game" to start again!`).css('fontSize', '30px').show();
    }
  }
}

module = module || {};
module.exports = {
  getBoard,
  findMatch,
  horizontalWinCheck,
  verticalWinCheck,
  gameEnd,
};

/*
client side:
- draw board, clicks,  determine column to place piece, make api calls

GET - unique user id. unique game id, current state of board
POST - update state of board, create new game

server side: 
- holding board state, checking who wins, whose turn it is, authentication?, handling api requests, score keeping



POST:  /games
GET:  /whose-turn => "red"
GET   /game/state 
PUT  /game/board/rows/0/cols/5
POST /game/board/cols/5
*/
