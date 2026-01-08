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
        const res = await api.get('/currentWeek');
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}