import { MAX_REELS, MAX_ITEMS_IN_REEL } from './reel';

export const calculateWinnings = (matrix: string[][], bet: number) => {
  let winningRows: number = 0;

  for (let i = 0; i < MAX_REELS; i++) {
    let rowOfItems: string[] = []; 

    for( let k = 0; k < MAX_ITEMS_IN_REEL ; k++ ) {
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