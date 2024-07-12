import { getFirstWalletOrCreate } from '../services/walletService';

let walletId: string | null = null;

export const initializeWalletId = async (): Promise<void> => {
  walletId = await getFirstWalletOrCreate();
  console.log(`Wallet ID initialized: ${walletId}`);
};

export const getWalletId = (): string | null => {
  return walletId;
};