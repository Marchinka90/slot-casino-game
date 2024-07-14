import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/slot-casino-game', );
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