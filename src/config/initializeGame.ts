import path from 'path';
import { prepareReel } from '../util/reel';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../../.env') });

// Use environment variables
export const MAX_REELS = process.env.MAX_REELS || 3;

let reels: string[][] = [];

let betsInGame: number = 0;
let winningsInGame: number = 0;

export const initializeGame = (): void => {
  for (let i=0; i< +MAX_REELS; i++) {
    reels[i] = prepareReel();
  }
  console.log('Game initialized');
};

export const getReels = (): string[][] => {
  return reels;
};

export const getTotalBetsInGame = (): number => {
  return betsInGame;
};

export const getTotalWinningsInGame = (): number => {
  return winningsInGame;
};

export const setTotalBetsInGame = (amount: number): void => {
  betsInGame += amount;
};

export const setTotalWinningsInGame = (amount: number): void => {
  winningsInGame += amount;
};

