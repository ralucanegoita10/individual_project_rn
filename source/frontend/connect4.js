/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */

const game = {
  boardLength: 7,
  boardHeight: 6,
};

const turnCount = 0;
let gameEnded = false;
let currentPlayer;
//let scores;

let player1 = prompt('player1: ', 'Red');
let player2 = prompt('player2: ', 'Yellow');

function getBoard(_board) {
  for (let i = 0; i < _board.length; i += 1) {
    for (let j = 0; j < _board[0].length; j += 1) {
      $(`#row-${i}-column-${j}`).css('background-color', 'white');
      $(`#row-${i}-column-${j}`)[0].parentNode.style.backgroundColor = 'blue';
    }
  }
}

/* Display the same board - when browser refreshes */
$.ajax({
  type: 'GET',
  url: '/get-board',
  contentType: 'application/json',
  success: (result) => {
    drawBoard(result.board);

    $('h3').text(`${player1}: it is your turn, please pick a column to drop your chip.`).show();

    const playerObj1 = result.scores.find((item) => item.player === 1);
    const playerObj2 = result.scores.find((item) => item.player === 2);

    redCounter.innerHTML = `Red has won ${playerObj1.score} games`;
    yellowCounter.innerHTML = `Yellow has won ${playerObj2.score} games`;
  },
});

function drawBoard(board) {
  for (let row = 0; row < board.length; row += 1) {
    for (let column = 0; column < board[row].length; column += 1) {
      $(`#row-${row}-column-${column}`).css('background-color', 'white');
      $(`#row-${row}-column-${column}`)[0].parentNode.style.backgroundColor = 'blue';

      if (board[row][column] === 0) {
        $(`#row-${row}-column-${column}`).css('background-color', 'white');
      } else if (board[row][column] === 1) {
        $(`#row-${row}-column-${column}`).css('background-color', 'red');
      } else if (board[row][column] === 2) {
        $(`#row-${row}-column-${column}`).css('background-color', 'yellow');
      }
    }
  }
}
function setNextTurn(player) {
  const playerName = player === 1 ? player1 : player2;
  $('h3').text(`${playerName}: it is your turn, please pick a column to drop your chip.`).show();
}

function gameEnd(winningPlayer) {
  $('h3').hide();
  $('h2').hide();
  $('h1').text(`${winningPlayer} has won! Press "New game" to start again!`)
    .css('fontSize', '30px')
    .show();
  gameEnded = true;
}

function setupEvents() {
  $(document).ready(() => {
  /* Start the game */
    for (let row = 0; row < game.boardHeight; row += 1) {
      for (let column = 0; column < game.boardLength; column += 1) {
        $(`#row-${row}-column-${column}`).click(() => {
          if (gameEnded) {
            return;
          }

          $.ajax({
            type: 'POST',
            url: `/game/column/${column}`,
            contentType: 'application/json',
            success: (result) => {
              drawBoard(result.board);
              setNextTurn(result.player);
            },
          });

          $.ajax({
            type: 'GET',
            url: '/game/winner',
            contentType: 'application/json',
            success: (result) => {
              console.log(result);

              const playerObj = result.scores.find((item) => item.player === result.winner);

              if (result.winner === 1) {
                gameEnd(player1);
                redCounter.innerHTML = `Red has won ${playerObj.score} games`;
              } 
              else if (result.winner === 2) {
                gameEnd(player2);
                yellowCounter.innerHTML = `Yellow has won ${playerObj.score} games`;
              }
            },
          });
        });
      }
    }

    $('#new-game-btn').on('click', () => {
      gameEnded = false;
      $.ajax({
        type: 'POST',
        url: '/game/reset-game',
        contentType: 'application/json',
        success: (result) => {
          drawBoard(result.board);
          setNextTurn(result.player);
          setTimeout(() => {
            player1 = prompt('player1: ', 'Red');
            player2 = prompt('player2: ', 'Yellow');
          }, 1000);
          $('h1').hide();
          $('h2').text('Connect 4 chips to win!').show();
        },
      });
    });
  });
}

setupEvents();

module.exports = {
  getBoard,
  setupEvents,
  drawBoard,
  setNextTurn,
  gameEnd,
};
