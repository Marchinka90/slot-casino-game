import path from 'path';
import { config } from 'dotenv';
config({ path: path.resolve(__dirname, '../../.env') });

export const MAX_ITEMS_IN_REEL = process.env.MAX_ITEMS_IN_REEL || 3;
export const MAX_REELS = process.env.MAX_ITEMS_IN_REEL || 3;

export const calculateWinnings = (matrix: string[][], bet: number) => {
  let winningRows: number = 0;

  for (let i = 0; i < +MAX_REELS; i++) {
    let rowOfItems: string[] = []; 

    for( let k = 0; k < +MAX_ITEMS_IN_REEL ; k++ ) {
      rowOfItems.push(matrix[k][i])
    }
    let isMatch = rowOfItems.every(item => item === rowOfItems[0]);
    
    if (isMatch) {
      winningRows++
    }
  }

  let winnings: number = winningRows * bet * 5; 

  return winnings; 
}