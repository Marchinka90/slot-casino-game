import { RequestHandler } from "express";

import { HttpError } from "../models/http-error";
import { getWallet, updateWalletBalance } from "../services/walletService";

export const depositInWallet: RequestHandler = async (req, res, next) => {
  try {  
    const wallet = await getWallet();
    if (!wallet) {
      throw new HttpError('Wallet not found', 404);
    }
    
    const { deposit } = req.body as { deposit: number };

    await updateWalletBalance(wallet, deposit, 'deposit');
  
    res.status(200).json({ message: `Wallet balance deposited successfully` });
    
  } catch (error) {
    if (error instanceof Error) {      
      const statusCode = (error as any).code || 500;
      return next(new HttpError(error.message, statusCode));
    }
    next(error);
  }
};

export const withdrawFromWallet: RequestHandler = async (req, res, next) => {
  try {  
    const wallet = await getWallet();
    if (!wallet) {
      throw new HttpError('Wallet not found', 404);
    }
    
    const { withdraw } = req.body as { withdraw: number };
    
    await updateWalletBalance(wallet, withdraw, 'withdraw');
  
    res.status(200).json({ message: `Wallet balance withdrawed successfully`, withdraw });
    
  } catch (error) {
    if (error instanceof Error) {      
      const statusCode = (error as any).code || 500;
      return next(new HttpError(error.message, statusCode));
    }
    next(error);
  }
};

export const walletBalance: RequestHandler = async (req, res, next) => {
  try {
    const wallet = await getWallet();

    if (!wallet) {
      throw new HttpError('Wallet not found', 404);
    }

    res.status(200).json({ balance: wallet.balance });
    
  } catch (error) {
    if (error instanceof Error) {      
      const statusCode = (error as any).code || 500;
      return next(new HttpError(error.message, statusCode));
    }
    next(error);
  }
};
