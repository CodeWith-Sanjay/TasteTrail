import express from 'express';
import { accessTokenVerification } from '../middleware/authMiddleware.js';
import { getDashboard } from '../controllers/dashboardController.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/getDashboard', accessTokenVerification, getDashboard);

export default dashboardRoutes