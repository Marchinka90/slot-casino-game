import { findWalletOrCreate } from '../services/walletService';

export const initializeWalletId = async (): Promise<void> => {
  await findWalletOrCreate();
  console.log(`Wallet initialized`);
};
