import { prepareRoll } from '../util/roll';

let rolls: string[][];

let betsInGame: number = 0;
let winningsInGame: number = 0;

export const initializeGame = (): void => {
  rolls = [prepareRoll(), prepareRoll(), prepareRoll()];
  console.log('Game initialized');
};

export const getRolls = (): string[][] => {
  return rolls;
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

