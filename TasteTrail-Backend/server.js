import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';

import contactRouter from './routes/contactRoute.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/contact', contactRouter);
app.use('/auth', authRoutes);

connectDB()
.then(
    app.listen(port, () => {
        console.log(`Server is running on localhost: ${port}`)
    })
)
.catch(err => {
    console.log('Server error: ', err)
})