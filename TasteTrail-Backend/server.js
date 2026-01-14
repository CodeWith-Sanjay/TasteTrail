import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';

import contactRouter from './routes/contactRoute.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import mealPlanRoutes from './routes/mealPlanRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000
const frontendOrigin = process.env.FrontendOrigin

app.use(cors({
  origin: [
    "http://localhost:5173",
    frontendOrigin
    ],
  credentials: true, // must be true for cookies
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/contact', contactRouter);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/mealPlan', mealPlanRoutes);

// console.log('Week', new Date().getDay());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

connectDB()
.then(
    app.listen(port, () => {
        console.log(`Server is running on localhost: ${port}`)
    })
)
.catch(err => {
    console.log('Server error: ', err)
})