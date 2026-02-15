import mongoose from 'mongoose'; 
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const dbURI = process.env.DB_URI; // Use the environment variable


export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(dbURI!); // Use the '!' to assert that it's defined
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

