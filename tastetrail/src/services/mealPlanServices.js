import {api} from './api.js';

export const generateMealPlan = async () => {
    try {
        const res = await api.get('/mealPlan/generate');
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export const currentWeekMealPlan = async () => {
    try {
        const res = await api.get('/mealPlan/currentWeek');
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export const changeRecipe = async (data) => {
    try {
        const res = await api.put('/mealPlan/changeRecipe', data);
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}