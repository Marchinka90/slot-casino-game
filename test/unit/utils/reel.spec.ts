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

describe("Test (RNG) Random Number Generator lybrary", () => {
  it("should return random number between 0 and reel length", () => {
    // arrange
    const reel: string[] = prepareReel();
    const reelLength: number = reel.length;

    // act
    const result: number = random(0, reelLength - 1);

    // assert
    expect(result).to.be.at.least(0);
    expect(result).to.be.at.most(reelLength - 1);
  });
});

describe("Test preparing reel", () => {
  let reel: string[];

  beforeEach(() => {
    // arrange
    reel = prepareReel();
  });

  it("should return number of reel lenght equal to configuration MAX_SLOTS", () => {
    // act
    const result: number = reel.length;

    // assert
    expect(result).to.equal(MAX_SLOTS);
  });

  it("should return number of random item in the reel equal to configuration MAX_NUMBER_OF_SPECIFIC_ITEM", () => {
    // act
    const itemsLength: number = ITEMS.length;
    const randomIndex: number = random(1, itemsLength - 1);
    const randomItem: string = ITEMS[randomIndex];
    const result: number = reel.filter((item) => item === randomItem).length;

    // assert
    expect(result).to.equal(MAX_NUMBER_OF_SPECIFIC_ITEM);
  });
});

describe("Test spinning reels", () => {
  let reels: string[][];
  let matrix: string[][];

  beforeEach(() => {
    // arrange
    reels = [prepareReel(), prepareReel(), prepareReel()];
    matrix = spinReels(reels);
  });

  it("should return matrix with reels equal to configuration MAX_REELS", () => {
    // act
    const result = matrix.length;

    // assert
    expect(result).to.equal(MAX_REELS);
  });

  it("should return number of items within every reel equal to configuration MAX_ITEMS_IN_REEL", () => {
    // act
    let result = true;
    for (let i = 0; i < MAX_REELS; i++) {
      if (matrix[i].length !== MAX_ITEMS_IN_REEL) {
        break;
      }
    }

    // assert
    expect(result).to.be.true;
  });
});
