import { random } from "lodash";

export const MAX_SLOTS = 30;
const MAX_NUMBER_OF_SPECIFIC_ITEM = 6;
export const MAX_ITEMS_PER_ROLL: number = 3;
export const MAX_ITEMS_PER_ROW: number = 3;

export const prepareRoll = (): string[] => {
  const newRoll: string[] = [];
  const items = ["cherry", "pear", "apple", "watermelon", "melon"];
  // const maxSlots: number = +process.env.MAX_SLOTS!;
  // const maxNumberOfSpecificItem: number = +process.env.MAX_NUMBER_OF_SPECIFIC_ITEM!;

  for (let i = 0; i < MAX_SLOTS; i++) {
    let addedItem = false;
    
    let countItems: Record<string, number> = newRoll.reduce((prev, nxt) => {
      // Increment the count for the current string or initialize to 1 if it doesn't exist
      prev[nxt] = (prev[nxt] || 0) + 1;

      return prev;
    }, {} as Record<string, number>);

    while (!addedItem) {
      const randomNum = random(0, 4);
      const currentItem = items[randomNum];

      // Check if current items is reached its qu
      if (countItems[currentItem] && countItems[currentItem] == MAX_NUMBER_OF_SPECIFIC_ITEM) {
        continue;
      }

      newRoll[i] = currentItem;
      addedItem = true;
    }
  }
  return newRoll;
}

export const spinTheRolls = (rolls: string[][]): string[][] => {
  const lastNumberOfArrayItems = MAX_SLOTS - 1;
  let matrix: string[][] = [];

  rolls.forEach((roll, col) => {
    let itemsOfMatrix: string[] = [];
    const firstIndex = random(0, lastNumberOfArrayItems);

    // Fill matrix rolls (cols)
    for(let i=0; i < MAX_ITEMS_PER_ROLL; i++) {

      // Check if the array is empty
      if (itemsOfMatrix.length < 0) {
        itemsOfMatrix[i] = roll[firstIndex]
      }
      // Check if prev item is the last one
      if (firstIndex + i > lastNumberOfArrayItems) {
        itemsOfMatrix[i] = roll[0];
      } else {
        itemsOfMatrix[i] = roll[firstIndex + i]
      }
    }
    matrix[col] = itemsOfMatrix;
  });

  return matrix;
}