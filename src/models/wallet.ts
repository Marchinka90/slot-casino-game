import mongoose, {Document, Schema} from "mongoose";

export interface IWallet extends Document {
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

const WalletSchema: Schema = new Schema({
  balance: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: 'USD' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, required: true, default: 'active', enum: ['active', 'suspended', 'closed'] }
});

const Wallet = mongoose.model<IWallet>('Wallet', WalletSchema);

export default Wallet;