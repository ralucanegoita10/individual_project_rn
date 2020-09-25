const request = require('supertest');

const mock = require('mock-fs');
const { app } = require('../source/server.js');

// const createServer = require('./source');

beforeEach(() => {
  mock({
    './source/data/game.json': JSON.stringify([
      {
        player: 1,
        score: 11,
      },
      {
        player: 2,
        score: 4,
      },
    ]),
  });
});

afterEach(() => {
  mock.restore();
});

const {
  readScores, updateScore, isPositionTaken,
  dropToBottom, resetGame, findMatch,
  horizontalWinCheck,
  verticalWinCheck,
} = require('../source/server.js');

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
  test('Returns true if all inputs are equal to each other', () => {
    const output = findMatch(1, 1, 1, 1);
    expect(output).toBe(true);
  });

  test('Returns false if all inputs but 1 are equal to each other', () => {
    const output = findMatch(1, 2, 2, 2);
    expect(output).toBe(false);
  });

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
    [1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];

  test('Returns the first available bottom-most position in a column', () => {
    // Arrange
    const xPos = 5;
    const freePos = 2;

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

  test('Returns the player number who had a  horizontal win: player 1', async () => {
    // Arrange
    const player = 1;

    // Act
    const winner = await horizontalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(1);
  });

  test('Returns the player number who had a  horizontal win: player 2', async () => {
    // Arrange
    const player = 2;

    // Act
    const winner = await horizontalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(2);
  });

  test('Returns -1 if there is no win detected', async () => {
    // Arrange
    const player = 1;

    const noWinTestBoard = [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 2, 0, 0, 0],
      [0, 0, 1, 0, 1, 1, 2],
      [1, 1, 1, 2, 1, 1, 2],
    ];

    // Act
    const noWinner = await horizontalWinCheck(noWinTestBoard, player);

    // Assert
    expect(noWinner).toBe(-1);
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

  test('Returns the player number who had a vertical win: player 1', async () => {
    // Arrange
    const player = 1;

    // Act
    const winner = await verticalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(1);
  });

  test('Returns the player number who had a vertical win: player 2', async () => {
    // Arrange
    const player = 2;

    // Act
    const winner = await verticalWinCheck(testBoard, player);

    // Assert
    expect(winner).toBe(2);
  });

  test('Returns -1 if there is no win detected', async () => {
    // Arrange
    const player = 1;

    const noWinTestBoard = [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 2, 0, 0, 0],
      [0, 0, 1, 0, 1, 1, 2],
      [1, 1, 0, 2, 1, 1, 2],
    ];

    // Act
    const noWinner = await verticalWinCheck(noWinTestBoard, player);

    // Assert
    expect(noWinner).toBe(-1);
  });
});

/**
 * API testing
 */

describe('GET /get-board', () => {
  // Arrange
  const expectedBody = {
    board: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    scores: [
      {
        player: 1,
        score: 11,
      },
      {
        player: 2,
        score: 4,
      },
    ],
  };

  it('responds with json', (done) => {
    request(app)
      .get('/get-board')
      .expect('Content-Type', /json/)
      .expect(expectedBody)
      .end(done);
  });
});

describe('/game/column/:column', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0],
  ];

  it('should return game board with values on positions', (done) => {
    request(app)
      .post('/game/column/2')
      .send()
      .expect('Content-Type', /json/)
      .expect({ board: testBoard, player: 2 })
      .end(done);
  });
});

describe('/game/reset-game', () => {
  // Arange
  const testBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  it('should return game board with all values 0', (done) => {
    request(app)
      .post('/game/reset-game')
      .send()
      .expect('Content-Type', /json/)
      .expect({ board: testBoard, player: 1 })
      .end(done);
  });
});

/*
const runEndToEndTest = async (moves, { reset = false }={}) => {
  const server = createServer();
  const agent = request.agent(server);

  for (let move of moves) {
      await agent
          .post('/game/column/2')
          .expect(200)
  }

  if (reset) {
      await agent.post('/game/reset-game')
  }

  let result;
  await agent
      .get('/get-board')
      .expect(200)
      .expect(res => {
          result = res.body
      });
  return result;
}
*/

describe.skip('/game/winner', () => {
  let winner;
  let gameEnded;

  it('should return a vertical winner', (done) => {
    const board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    request(app)
      .post('/game/winner')
      .send()
      .expect('Content-Type', /json/)
      .expect({ winner: 1, gameEnded: true, player: 1 })
      .end(done);
  });

  it('should return a horizontal winner', (done) => {
    request(app)
      .post('/game/winner')
      .send()
      .expect('Content-Type', /json/)
      .expect({ winner: 1, gameEnded: true, player: 1 })
      .end(done);
  });

  it('should return a null object', (done) => {
    request(app)
      .post('/game/winner')
      .send()
      .expect('Content-Type', /json/)
      .expect({ winner: 1, gameEnded: true, player: 1 })
      .end(done);
  });
});
