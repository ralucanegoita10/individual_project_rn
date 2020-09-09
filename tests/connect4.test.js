const { findMatch } = require('../source/functions');

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

