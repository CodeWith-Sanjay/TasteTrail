import express from 'express';
import { changeRecipe, currentWeekMealPlan, generateMealPlan } from '../controllers/mealPlanController.js';
import {accessTokenVerification} from '../middleware/authMiddleware.js';

const mealPlanRoutes = express.Router();

mealPlanRoutes.get('/generate', accessTokenVerification, generateMealPlan)
mealPlanRoutes.get('/currentWeek', accessTokenVerification, currentWeekMealPlan)
mealPlanRoutes.put('/changeRecipe', accessTokenVerification, changeRecipe)

export default mealPlanRoutes