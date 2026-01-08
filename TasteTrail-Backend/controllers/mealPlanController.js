import {User} from '../models/User.js';
import {Recipe} from '../models/Recipe.js';
import {MealPlan} from '../models/MealPlan.js';

const getWeekStartDate = () => {
    const now = new Date();
    const day = now.getDay();

    now.setDate(now.getDate() - day);
    now.setHours(0,0,0,0)

    return now
}

export const generateMealPlan = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const diet = user.preferences?.diet;
        const allergies = user.preferences?.allergies;
        const cuisines = user.preferences?.cuisines;

        const weekStartDate = getWeekStartDate()
        const existingPlan = await MealPlan.findOne({
            userId: user._id,
            weekStartDate,
        }).populate('slots.Sunday.breakfast slots.Sunday.lunch slots.Sunday.dinner');

        if(existingPlan) {
            return res.status(200).json({
                success: true,
                data: existingPlan
            })
        }

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const meals = ['breakfast', 'lunch', 'dinner'];

        const slots = {};

        for(const day of days) {
            slots[day] = {};

            for(const meal of meals) {
                let recipe = await Recipe.findOne({
                    diet,
                    category: meal,
                    allergies: {$nin: allergies},
                    cuisines: {$in: cuisines}
                })

                if(!recipe) {
                    recipe = await Recipe.findOne({
                        diet,
                        category: meal,
                        allergies: {$nin: allergies}
                    })
                }

                if(!recipe) {
                    recipe = await Recipe.findOne({
                        diet,
                        category: meal
                    })
                }

                if(!recipe) {
                    recipe = await Recipe.findOne({
                        category: meal
                    })
                }

                slots[day][meal] = recipe._id
            }
        }

        const mealPlan = await MealPlan.create({
            userId: req.user.id,
            weekStartDate,
            slots
        })

        return res.status(201).json({
            success: true,
            message: 'Generating meal plan successful',
            data: mealPlan
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error generating meal plan',
            error: error.message
        })
    }
}

export const currentWeekMealPlan = async (req, res) => {
    try {
        const userId = req.user.id
        const weekStartDate = getWeekStartDate();

        const mealPlan = await MealPlan.findOne({
            userId,
            weekStartDate
        }).populate('slots.Sunday.breakfast slots.Sunday.lunch slots.Sunday.dinner')
        .populate('slots.Monday.breakfast slots.Monday.lunch slots.Monday.dinner')
        .populate('slots.Tuesday.breakfast slots.Tuesday.lunch slots.Tuesday.dinner')
        .populate('slots.Wednesday.breakfast slots.Wednesday.lunch slots.Wednesday.dinner')
        .populate('slots.Thursday.breakfast slots.Thursday.lunch slots.Thursday.dinner')
        .populate('slots.Friday.breakfast slots.Friday.lunch slots.Friday.dinner')
        .populate('slots.Saturday.breakfast slots.Saturday.lunch slots.Saturday.dinner')

        return res.status(200).json({
            success: true,
            message: 'Getting current week meal plan successful',
            data: mealPlan
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Getting current week meal plan unsuccessful',
            error: error.message
        })
    }
}