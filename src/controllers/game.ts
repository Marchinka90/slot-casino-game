import { RequestHandler } from 'express';

import { HttpError } from '../models/http-error';
import { spinReels } from '../util/reel';
import { calculateWinnings } from '../util/calculator';
import { getWallet } from "../services/walletService";

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
  
  try {
    const wallet = await getWallet();
    if (!wallet) {
      throw new HttpError('Wallet not found', 404);
    }

    await updateWalletBalance(wallet, bet, 'withdraw');

    setTotalBetsInGame(bet);
  
    let reels = getReels();
    const matrix = spinReels(reels);
    
    const winnings = calculateWinnings(matrix, bet);

    if (winnings > 0) {
      setTotalWinningsInGame(winnings);
      await updateWalletBalance(wallet, winnings, 'deposit');
    }
  
    res.status(200).json({ matrix, winnings });
  } catch (error) {
    if (error instanceof Error) {      
      const statusCode = (error as any).code || 500;
      return next(new HttpError(error.message, statusCode));
    }
    next(error);
  }
};

export const spinInMultiple: RequestHandler = async (req, res, next) => {
  const { count, bet } = req.body as { count: number; bet: number };
  const totalBet = bet * count;

  try {
    const wallet = await getWallet();
    if (!wallet) {
      throw new HttpError('Wallet not found', 404);
    }
    
    await updateWalletBalance(wallet, totalBet, 'withdraw');
    setTotalBetsInGame(totalBet);

    
    let totalWinnings: number = 0;
  
    for (let i = 0; i < count; i++) {
      let reels = getReels();
      const matrix = spinReels(reels);
      const winnings = calculateWinnings(matrix, bet);
      totalWinnings += winnings;
    }

    if (totalWinnings > 0) {
      setTotalWinningsInGame(totalWinnings);
      await updateWalletBalance(wallet, totalWinnings, 'deposit');
    }
  
    const netResult = totalWinnings - totalBet;
  
    res.status(200).json({ totalWinnings, netResult });
  } catch (error) {
    if (error instanceof Error) {      
      const statusCode = (error as any).code || 500;
      return next(new HttpError(error.message, statusCode));
    }
    next(error);
  }
};

export const returnToPlayer: RequestHandler = (req, res, next) => {
  let rtp: number;
  
  let totalBetsInGame = getTotalBetsInGame();
  if (totalBetsInGame == 0) {
    return res.status(200).json({ rtp: 0 });
  }

  let totalWinningsInGame = getTotalWinningsInGame();
  rtp = Math.round((totalWinningsInGame / totalBetsInGame) * 100);

  res.status(200).json({ rtp });
};
