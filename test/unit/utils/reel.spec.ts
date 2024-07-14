import { expect } from "chai";
import { random } from "lodash";

import { prepareReel, spinReels } from "../../../src/util/reel";
import {
  ITEMS,
  MAX_SLOTS,
  MAX_NUMBER_OF_SPECIFIC_ITEM,
  MAX_REELS,
  MAX_ITEMS_IN_REEL,
} from "../../../src/util/reel";

describe("Test (RNG) Random Number Generator lybrary - Unit Tests", () => {
  it("should return random number between 0 and reel length", () => {
    // Arrange
    const reel: string[] = prepareReel();
    const reelLength: number = reel.length;

    // Act
    const result: number = random(0, reelLength - 1);

    // Assert
    expect(result).to.be.at.least(0);
    expect(result).to.be.at.most(reelLength - 1);
  });
});

describe("Test preparing reel - Unit Tests", () => {
  // Arrange
  let reel: string[];

  beforeEach(() => {
    reel = prepareReel();
  });

  it("should return number of reel lenght equal to configuration MAX_SLOTS", () => {
    // Act
    const result: number = reel.length;

    // Assert
    expect(result).to.equal(MAX_SLOTS);
  });

  it("should return number of random item in the reel equal to configuration MAX_NUMBER_OF_SPECIFIC_ITEM", () => {
    // Act
    const itemsLength: number = ITEMS.length;
    const randomIndex: number = random(1, itemsLength - 1);
    const randomItem: string = ITEMS[randomIndex];
    const result: number = reel.filter((item) => item === randomItem).length;

    // Assert
    expect(result).to.equal(MAX_NUMBER_OF_SPECIFIC_ITEM);
  });
});

describe("Test spinning reels - Unit Tests", () => {
  let reels: string[][];
  let matrix: string[][];

  beforeEach(() => {
    // Arrange
    reels = [prepareReel(), prepareReel(), prepareReel()];
    matrix = spinReels(reels);
  });

  it("should return matrix with reels equal to configuration MAX_REELS", () => {
    // Act
    const result = matrix.length;

    // Assert
    expect(result).to.equal(MAX_REELS);
  });

  it("should return number of items within every reel equal to configuration MAX_ITEMS_IN_REEL", () => {
    // Act
    let result = true;
    for (let i = 0; i < MAX_REELS; i++) {
      if (matrix[i].length !== MAX_ITEMS_IN_REEL) {
        break;
      }
    }

    // Assert
    expect(result).to.be.true;
  });
});
