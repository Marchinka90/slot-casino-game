import Wallet, { IWallet } from "../models/wallet";
import { HttpError } from "../models/http-error";

export const createWallet = async (): Promise<IWallet> => {
  const wallet = new Wallet();
  return await wallet.save();
};

export const getWalletById = async (id: string): Promise<IWallet | null> => {
  return await Wallet.findById(id);
};

export const getWallet = async (): Promise<IWallet | null> => {
  return await Wallet.findOne();
};

export const updateWalletBalance = async (
  wallet: IWallet,
  amount: number,
  operation: "deposit" | "withdraw"
): Promise<void> => {
  
  if (operation === "withdraw" && wallet.balance < amount) {
    throw new HttpError("Insufficient balance", 400);
  }
  wallet.balance += operation === "deposit" ? amount : -amount;
  wallet.updatedAt = new Date();
  await wallet.save();
};

export const findWalletOrCreate = async (): Promise<void> => {
  const wallet = await Wallet.findOne();
  if (!wallet) {
    const newWallet = new Wallet();
    await newWallet.save();
  }
};
