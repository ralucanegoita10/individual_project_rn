const { request } = require('express');
const app = require('../source/server.js');
const {
  readScores, updateScore, isPositionTaken,
  dropToBottom, resetGame, findMatch,
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

  const xPos = 1;
  const yPos = 2;

  test('Returns false if a position is not taken', () => {
    // Act
    const output = isPositionTaken(testBoard, xPos, yPos);
    // Assert
    expect(output).toBe(false);
  });

  test('Returns true if a position is taken', () => {
    // Arrange
    testBoard[yPos][xPos] = 1;
    // Act
    const output = isPositionTaken(testBoard, xPos, yPos);
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
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  test('Returns the first available bottom-most position in a column', () => {
    // Arrange
    const xPos = 5;
    const freePos = 1;

    // Act
    const output = dropToBottom(testBoard, xPos, freePos);

    // Assert
    expect(output).toBe(freePos);
  });

  test('Returns -1 if the column is full', () => {
    // Arrange
    const xPos = 1;
    const freePos = 2;

    // Act
    const output = dropToBottom(testBoard, xPos, freePos);

    // Assert
    expect(output).toBe(-1);
  });
});

describe('resetGame', () => {
  // Arange
  const testBoard = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  test('Returns the board with all values set to 0', () => {
    // Arrange

    // Act
    const output = resetGame(testBoard);

    // Assert
    expect(output).toMatchObject(expectedOutput);
  });
});

describe('horizontalWinCheck', () => {
  // Arange
  const testBoard = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 2],
    [1, 1, 1, 2, 1, 1, 2],
  ];

  test('Returns the player number who had a  horizontal win: player 1', () => {
    // Arrange
    const player = 1;

    // Act
    const winner = horizontalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(1);
  });

  test('Returns the player number who had a  horizontal win: player 2', () => {
    // Arrange
    const player = 2;

    // Act
    const winner = horizontalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(2);
  });
});

describe('verticalWinCheck', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0],
  ];

  test('Returns the player number who had a vertical win: player 1', () => {
    // Arrange
    const player = 1;

    // Act
    const winner = verticalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(1);
  });

  test('Returns the player number who had a vertical win: player 2', () => {
    // Arrange
    const player = 2;

    // Act
    const winner = verticalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(2);
  });
});

/*
describe.skip('/get-board', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  it('should return game board in initial state', done => {
    request(app)
    .get('/board')
  });
});


describe.skip('/game/column/:column', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  it('should return game board with values on positions', (done) => {
    request(app)
      .post('/game/column/:column').send({
        testBoard: ,
        player: 2,
      });
  });
});
*/
