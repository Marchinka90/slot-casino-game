import path from 'path';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../../.env') });
const DB = process.env.MONGODB_URI

if (!DB) {
  throw new Error('Missing necessary environment variables');
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB);
    console.log('MongoDB connected');
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export async function disconnectFromDB(): Promise<void> {
  await mongoose.disconnect();
}

export default connectDB;