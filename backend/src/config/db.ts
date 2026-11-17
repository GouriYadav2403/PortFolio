import dns from 'node:dns';
import mongoose from 'mongoose';
import { ENV } from './env.js';

// Fallback to Google Public DNS to prevent Windows/ISP from blocking SRV records (ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch {
  // Ignore if environment prevents custom DNS
}

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
