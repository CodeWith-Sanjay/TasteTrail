import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongodb_url = process.env.MONGODB_URL

export const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_url);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('Error connecting Mongo DB:', error);
    }
}