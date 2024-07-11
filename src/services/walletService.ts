import Wallet from "../models/wallet";

export const createWallet = async () => {
    const wallet = new Wallet();
    await wallet.save();
    return wallet;
}

export const getWalletById = async (id: string) => {
    return await Wallet.findById(id);
};

export const getAllWallets = async () => {
    return await Wallet.find({});
};