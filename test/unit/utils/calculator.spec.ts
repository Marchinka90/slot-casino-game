import { expect } from "chai";
import { calculateWinnings } from "../../../src/util/calculator";

describe("Test calculator for winnings", () => {
  it("should return no winnigs, no rows matched", () => {
    // arrange
    const matrix: string[][] = [
      ["cherry", "apple", "pear"],
      ["apple", "watermelon", "pear"],
      ["orange", "watermelon", "cherry"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(0);
  });

  it("should return 5 winnigs - first row matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["cherry", "apple", "pear"],
      ["cherry", "watermelon", "pear"],
      ["cherry", "watermelon", "cherry"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(5);
  });

  it("should return 5 winnigs - second row matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["cherry", "watermelon", "pear"],
      ["apple", "watermelon", "pear"],
      ["orange", "watermelon", "cherry"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(5);
  });

  it("should return 5 winnigs - third row matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["cherry", "apple", "pear"],
      ["apple", "watermelon", "pear"],
      ["orange", "watermelon", "pear"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(5);
  });

  it("should return 10 winnigs - first and second rows matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["orange", "watermelon", "pear"],
      ["orange", "watermelon", "pear"],
      ["orange", "watermelon", "cherry"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(10);
  });

  it("should return 10 winnigs - first and third rows matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["orange", "apple", "pear"],
      ["orange", "watermelon", "pear"],
      ["orange", "cherry", "pear"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(10);
  });

  it("should return 10 winnigs - second and third rows matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["orange", "watermelon", "pear"],
      ["apple", "watermelon", "pear"],
      ["cherry", "watermelon", "pear"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(10);
  });

  it("should return 15 winnigs - all rows matched ", () => {
    // arrange
    const matrix: string[][] = [
      ["orange", "watermelon", "pear"],
      ["apple", "watermelon", "pear"],
      ["cherry", "watermelon", "pear"],
    ];

    const bet = 1;
    // act
    const result = calculateWinnings(matrix, bet);

    // assert
    expect(result).to.equal(10);
  });
});