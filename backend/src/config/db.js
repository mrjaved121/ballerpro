import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async () => {
  try {
    const options = {
      // Connection pool options
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain at least 5 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      
      // Server selection options
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      
      // Heartbeat options
      heartbeatFrequencyMS: 10000, // Send a ping every 10 seconds
    };

    await mongoose.connect(config.mongodbUri, options);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Port: ${mongoose.connection.port}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    if (config.nodeEnv === 'production') {
      process.exit(1);
    } else {
      console.warn('⚠️  Continuing without MongoDB connection (development mode)');
    }
  }
};

// Graceful shutdown
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

