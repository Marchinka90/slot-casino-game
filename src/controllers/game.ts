import { RequestHandler } from 'express';

// import { HttpError } from '../models/http-error';
import { spinTheRolls } from '../util/roll';
import { calculateWinnings } from '../util/calculator';

import { 
  getRolls,
  getTotalBetsInGame,
  getTotalWinningsInGame,
  setTotalBetsInGame,
  setTotalWinningsInGame,
} from '../config/initializeGame';

export const playAGame: RequestHandler = async (req, res, next) => {
  const { bet } = (req.body as { bet: number });
  setTotalBetsInGame(bet);
  // --- BONUS --- Deduct the bet amount from the player's wallet.

  // --- DONE --- Perform a random spin using the RNG.
  let rolls = getRolls();
  const matrix = spinTheRolls(rolls);

  // --- DONE --- Calculate the winnings based on the final symbol matrix.
  const winnings = calculateWinnings(matrix, bet);
  setTotalWinningsInGame(winnings);

  // --- BONUS --- Update the player's wallet with the winnings.

  res.status(200).json({ matrix, winnings });
};

export const spinInMultiple: RequestHandler = (req, res, next) => {
  const { count, bet } = req.body as { count: number; bet: number };

  const totalBet = bet * count;
  setTotalBetsInGame(totalBet);
  // --- BONUS --- Deduct the total bet amount (bet * count) from the player's wallet.

  // --- DONE --- Perform the specified number of spins.
  let totalWinnings: number = 0;

  for (let i = 0; i < count; i++) {
    let rolls = getRolls();
    const matrix = spinTheRolls(rolls);
    const winnings = calculateWinnings(matrix, bet);
    totalWinnings += winnings;
  }
  setTotalWinningsInGame(totalWinnings);
 
  // --- DONE --- Calculate the total winnings and net result (total winnings - total bet).
  const netResult = totalWinnings - totalBet;

  // --- BONUS --- Update the player's wallet with the total winnings.

  res.status(200).json({ totalWinnings, netResult });
};

export const returnToPlayer: RequestHandler = (req, res, next) => {
  // --- DONE --- Calculate the RTP percentage based on all spins made so far - total bets vs. total winnings
  let rtp: number;
  
  let totalBetsInGame = getTotalBetsInGame();
  if (totalBetsInGame == 0) {
    return res.status(200).json({ rtp: 0 });
  }

  let totalWinningsInGame = getTotalWinningsInGame();
  rtp = Math.round((totalWinningsInGame / totalBetsInGame) * 100);

  res.status(200).json({ rtp });
};
