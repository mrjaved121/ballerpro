import mongoose from 'mongoose';
import { config } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (config.nodeEnv === 'production') {
      process.exit(1);
    } else {
      console.warn('Continuing without MongoDB connection (development mode)');
    }
  }
};

