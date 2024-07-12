import { RequestHandler } from "express";

import { HttpError } from "../models/http-error";
import { getWalletId } from "../config/initializeWallet";
import { getWalletById, updateWalletBalance } from "../services/walletService";

export const depositInWallet: RequestHandler = async (req, res, next) => {
  try {  
    const walletId = getWalletId();
    if (!walletId) {
      throw new HttpError('Wallet not found', 500);
    }
    
    const { deposit } = req.body as { deposit: number };

    await updateWalletBalance(walletId, deposit, 'deposit');
  
    res.status(201).json({ message: `Wallet balance deposited successfully` });
    
  } catch (error) {
    if (error instanceof Error) {
      return next(new HttpError(error.message, 500));
    }
    next(error);
  }
};

export const withdrawFromWallet: RequestHandler = async (req, res, next) => {
  try {  
    const walletId = getWalletId();
    if (!walletId) {
      throw new HttpError('Wallet not found', 500);
    }
    
    const { withdraw } = req.body as { withdraw: number };
    await updateWalletBalance(walletId, withdraw, 'withdraw');
  
    res.status(201).json({ message: `Wallet balance withdrawed successfully` });
    
  } catch (error) {
    if (error instanceof Error) {
      return next(new HttpError(error.message, 500));
    }
    next(error);
  }
};

export const walletBalance: RequestHandler = async (req, res, next) => {
  try {
    const walletId = getWalletId();

    if (!walletId) {
      throw new HttpError('Wallet not found', 500);
    }

    const wallet = await getWalletById(walletId);

    if (!wallet) {
      res.status(404).json({ message: 'Wallet not found' });
    } else {
      res.status(200).json({ balance: wallet.balance });
    }
    
  } catch (error) {
    if (error instanceof Error) {
      return next(new HttpError(error.message, 500));
    }
    next(error);
  }
};
