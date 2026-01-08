import express from 'express';
import { currentWeekMealPlan, generateMealPlan } from '../controllers/mealPlanController.js';
import {accessTokenVerification} from '../middleware/authMiddleware.js';

const mealPlanRoutes = express.Router();

mealPlanRoutes.get('/generate', accessTokenVerification, generateMealPlan)
mealPlanRoutes.get('/currentWeek', accessTokenVerification, currentWeekMealPlan)

export default mealPlanRoutes