import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async (): Promise<boolean> => {
  if (!ENV.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI not provided. Running in memory/stateless mode without persistent DB.');
    return false;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};
