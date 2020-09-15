const turnCount = 0;
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

function getBoard(_board) {
  for (let i = 0; i < _board.length; i += 1) {
    for (let j = 0; j < _board[0].length; j += 1) {
      $(`#row-${i}-column-${j}`).css('background-color', 'white');
      $(`#row-${i}-column-${j}`)[0].parentNode.style.backgroundColor = 'blue';
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
