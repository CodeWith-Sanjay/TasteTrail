import express from 'express';
import { accessTokenVerification } from '../middleware/authMiddleware.js';
import { getDashboard, getTodayRecipe } from '../controllers/dashboardController.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/getDashboard', accessTokenVerification, getDashboard);
dashboardRoutes.get('/todayRecipe', accessTokenVerification, getTodayRecipe);

dashboardRoutes.get('/test', (req, res) => {
  res.json({ success: true, message: 'Dashboard route working' });
});

export default dashboardRoutes