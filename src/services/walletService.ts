import Wallet, { IWallet } from "../models/wallet";
import { HttpError } from "../models/http-error";

export const createWallet = async (): Promise<IWallet> => {
  const wallet = new Wallet();
  return await wallet.save();
};

export const getWalletById = async (id: string): Promise<IWallet | null> => {
  return await Wallet.findById(id);
};

export const getAllWallets = async (): Promise<IWallet[] | null> => {
  return await Wallet.find({});
};

export const updateWalletBalance = async (
  id: string,
  amount: number,
  operation: "deposit" | "withdraw"
): Promise<void> => {

  const wallet = await Wallet.findById(id);
  if (!wallet) {
    throw new HttpError("Wallet not found", 404);
  }
  
  if (operation === "withdraw" && wallet.balance < amount) {
    throw new HttpError("Insufficient balance", 400);
  }
  wallet.balance += operation === "deposit" ? amount : -amount;
  wallet.updatedAt = new Date();
  await wallet.save();
};

export const getFirstWalletOrCreate = async (): Promise<string> => {
  const wallet = await Wallet.findOne();
  if (!wallet) {
    const newWallet = new Wallet();
    await newWallet.save();
    return newWallet.id;
  }
  return wallet.id;
};
