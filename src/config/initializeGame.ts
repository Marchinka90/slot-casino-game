import { prepareReel } from '../util/reel';

let reels: string[][];

let betsInGame: number = 0;
let winningsInGame: number = 0;

export const initializeGame = (): void => {
  reels = [prepareReel(), prepareReel(), prepareReel()];
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

