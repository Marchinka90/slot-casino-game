import path from 'path';
import { random } from 'lodash';
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../../.env') });

export const ITEMS = ['cherry', 'pear', 'apple', 'watermelon', 'orange'];
// Use environment variables
export const MAX_SLOTS = process.env.MAX_SLOTS || 30;
export const MAX_NUMBER_OF_SPECIFIC_ITEM = process.env.MAX_NUMBER_OF_SPECIFIC_ITEM || 6;
export const MAX_ITEMS_IN_REEL = process.env.MAX_ITEMS_IN_REEL || 3;

export const prepareReel = (): string[] => {
  const newReel: string[] = [];
  
  for (let i = 0; i < +MAX_SLOTS; i++) {
    let addedItem = false;
    
    while (!addedItem) {
      const randomNum = random(0, 4);
      const currentItem = ITEMS[randomNum];

      // check if current items is reached its quantity
      const countCurrentItem = newReel.filter(item => item === currentItem).length;
      if (countCurrentItem == MAX_NUMBER_OF_SPECIFIC_ITEM) {
        continue;
      }

      newReel[i] = currentItem;
      addedItem = true;
    }
  }
  return newReel;
}

export const spinReels = (reels: string[][]): string[][] => {
  const maxItems = +MAX_SLOTS - 1;
  let matrix: string[][] = [];
  
  reels.forEach((reel, key) => {
    let itemsOfMatrix: string[] = [];
    const firstIndex = random(0, maxItems);  //random number 10

    // Fill matrix reels
    for(let i=0; i < +MAX_ITEMS_IN_REEL; i++) {

      // Check if the array is empty
      if (itemsOfMatrix.length < 0) {
        itemsOfMatrix[i] = reel[firstIndex];
        continue;
      }

      // Check if prev item is the last one
      if (firstIndex + i > maxItems) {
        itemsOfMatrix[i] = reel[0];
      } else {
        itemsOfMatrix[i] = reel[firstIndex + i]
      }
    }
    matrix[key] = itemsOfMatrix;
  });

  return matrix;
}