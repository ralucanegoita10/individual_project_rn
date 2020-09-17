const {
  readScores, updateScore, isPositionTaken,
  droptoBottom, resetGame, findMatch,
  horizontalWinCheck,
  verticalWinCheck,
} = require('../source/server.js');

/*
describe("isTurnTaken", () => {
    document.getElementById("row-0-column-0").style.backgroundColor = "blue";
    each([
        [document.getElementById("row-0-column-0"), "red"],

    ]).it("take turn with elements", (square, expected) => {
        takeTurn(square);
        expected(square.style.backgroundColor).toBe(expected);
    })

})
*/
describe('isPositionTaken', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  test('Returns false if a position is not taken', () => {
    // Act
    const output = isPositionTaken(testBoard, 1, 2);
    // Assert
    expect(output).toBe(false);
  });

  test('Returns true if a position is taken', () => {
    // Arrange
    testBoard[2][1] = 1;
    // Act
    const output = isPositionTaken(testBoard, 1, 2);
    // Assert
    expect(output).toBe(true);
  });

  test('Returns false if an argument is undefined', () => {
    expect(() => {
      isPositionTaken(testBoard, undefined, 3);
    }).toThrow('Argument undefined');
  });
});

describe('findMatch', () => {
  test('Returns false if all inputs are undefined', () => {
    const output = findMatch(undefined, undefined, undefined, undefined);
    expect(output).toBe(false);
  });

  test('Returns false if 3 inputs are undefined and 1 is not undefined', () => {
    const output = findMatch(1, undefined, undefined, undefined);
    expect(output).toBe(false);
  });
});

describe('droptoBottom', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  //test('Returns the first available bottom-most position in a column', () => {

  });
});
