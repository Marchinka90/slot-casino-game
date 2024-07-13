import { RequestHandler } from 'express';

import { HttpError } from '../models/http-error';
import { spinReels } from '../util/reel';
import { calculateWinnings } from '../util/calculator';
import { getWalletId } from "../config/initializeWallet";

import { 
  getReels,
  getTotalBetsInGame,
  getTotalWinningsInGame,
  setTotalBetsInGame,
  setTotalWinningsInGame,
} from '../config/initializeGame';

import { updateWalletBalance } from "../services/walletService";

export const playAGame: RequestHandler = async (req, res, next) => {
  const { bet } = (req.body as { bet: number });
  // --- BONUS --- Deduct the bet amount from the player's wallet.
  try {
    const walletId = getWalletId();
    if (!walletId) {
      throw new HttpError('Wallet not found', 500);
    }

    await updateWalletBalance(walletId, bet, 'withdraw');

    setTotalBetsInGame(bet);
  
    // --- DONE --- Perform a random spin using the RNG.
    let reels = getReels();
    const matrix = spinReels(reels);
    // --- DONE --- Calculate the winnings based on the final symbol matrix.
    const winnings = calculateWinnings(matrix, bet);

    if (winnings > 0) {
      setTotalWinningsInGame(winnings);
      // --- BONUS --- Update the player's wallet with the winnings.
      await updateWalletBalance(walletId, winnings, 'deposit');
    }
  
    res.status(200).json({ matrix, winnings });
  } catch (error) {
    if (error instanceof Error) {
      return next(new HttpError(error.message, 500));
    }
    next(error);
  }

};

export const spinInMultiple: RequestHandler = async (req, res, next) => {
  const { count, bet } = req.body as { count: number; bet: number };
  const totalBet = bet * count;

  try {
    const walletId = getWalletId();
    if (!walletId) {
      throw new HttpError('Wallet not found', 500);
    }

    // --- BONUS --- Deduct the total bet amount (bet * count) from the player's wallet.
    await updateWalletBalance(walletId, totalBet, 'withdraw');
    setTotalBetsInGame(totalBet);

    // --- DONE --- Perform the specified number of spins.
    let totalWinnings: number = 0;
  
    for (let i = 0; i < count; i++) {
      let reels = getReels();
      const matrix = spinReels(reels);
      const winnings = calculateWinnings(matrix, bet);
      totalWinnings += winnings;
    }

    if (totalWinnings > 0) {
      setTotalWinningsInGame(totalWinnings);
      
      // --- BONUS --- Update the player's wallet with the total winnings.
      await updateWalletBalance(walletId, totalWinnings, 'deposit');
    }
  
    // --- DONE --- Calculate the total winnings and net result (total winnings - total bet).
    const netResult = totalWinnings - totalBet;
  
    res.status(200).json({ totalWinnings, netResult });
  } catch (error) {
    if (error instanceof Error) {
      return next(new HttpError(error.message, 500));
    }
    next(error);
  }
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
