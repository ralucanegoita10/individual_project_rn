/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */

/* Display the board game */
getBoard();

player1 = prompt('player1: ', "red");
player2 = prompt('player2: ', "yellow");

function drawBoard(board) {
  for (let row = 0; row < board.length; row += 1) {
    for (let column = 0; column < board[row].length; column += 1) {
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
  if (player === 1) {
    $('h3').text(`${player1}: it is your turn, please pick a column to drop your chip.`).show();
  } else {
    $('h3').text(`${player2}: it is your turn, please pick a column to drop your chip.`).show();
  }
}

function gameEnd(winningPlayer) {
 // for (let col = 0; col < board.length; col += 1) {
   // for (let row = 0; row < board.length; row += 1) {
      $('h3').hide();
      $('h2').hide();
      $('h1').text(`${winningPlayer} has won! Press "New game" to start again!`).css('fontSize', '30px').show();
      
   // }
  //}
  console.log(winningPlayer);
}

function tryThis() {
  $(document).ready(() => {
  /* Start the game */
    for (let row = 0; row < Game.boardHeight; row += 1) {
      for (let column = 0; column < Game.boardLength; column += 1) {
        $(`#row-${row}-column-${column}`).click(() => {
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
              if (result === 1) {
                gameEnd(player1);
              } else if (result === 2) {
                gameEnd(player2);
              }
            },
          });
        });
      }
    }

    $('#new-game-btn').on('click', () => {
      $.ajax({
        type: 'POST',
        url: '/game/reset-game',
        contentType: 'application/json',
        success: (result) => {
          drawBoard(result.board);
          setNextTurn(result.player);
          setTimeout(() => {
            player1 = prompt('player1: ', "red");
            player2 = prompt('player2: ', "yellow");
          }, 1000);
          $('h1').hide();
          $('h2').text("Connect 4 chips to win!").show();

        },
      });
    });
  });
}

tryThis();

module = module || {};
module.exports = {
  tryThis,
};
