//const { drawBoard, setNextTurn, gameEnd } = require('../source/frontend/connect4.js');

describe.skip('isTurnTaken', () => {
  document.getElementById('row-0-column-0').style.backgroundColor = 'blue';
  each([
    [document.getElementById('row-0-column-0'), 'red'],

  ]).it('take turn with elements', (square, expected) => {
    takeTurn(square);
    expected(square.style.backgroundColor).toBe(expected);
  });
});
