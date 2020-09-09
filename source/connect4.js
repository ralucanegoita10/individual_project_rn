/* eslint-disable no-loop-func */
/* eslint-disable no-use-before-define */

/* Display the board game */
getBoard();
resetBoard();

/* Display the button to reset game */
$(document).ready(() => {
  /* Start the game */
  for (let row = 0; row < Game.boardHeight; row += 1) {
    for (let column = 0; column < Game.boardLength; column += 1) {
      $(`#row-${row}-column-${column}`).click(() => {
        const empty = dropToBottom(column);
        if (empty === -1) {
          return;
        }

        if (turnCount % 2 === 0) {
          currentPlayer = player1;

          /* This next line shows whose turn it is */
          $('h3').text(`${player2}: it is your turn, please pick a column to drop your chip.`).show();

          /* Change position colour to red */
          $(`#row-${empty}-column-${column}`).css('background-color', 'red');
          board[empty][column] = 1;
          turnCount += 1;
        } else {
          currentPlayer = player2;

          /* This next line shows whose turn it is */
          $('h3').text(`${player1}: it is your turn, please pick a column to drop your chip.`).show();

          /* Change position colour to yellow */
          $(`#row-${empty}-column-${column}`).css('background-color', 'yellow');
          board[empty][column] = 2;

          turnCount += 1;
        }

        if (horizontalWinCheck(board) || verticalWinCheck(board)) {
          gameEnd(currentPlayer);
        }
      });
    }
  }

  $('#new-game-btn').on('click', () => {
    resetBoard();
  });
});
