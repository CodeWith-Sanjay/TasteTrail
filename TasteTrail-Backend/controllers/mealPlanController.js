import {User} from '../models/User.js';
import {Recipe} from '../models/Recipe.js';
import {MealPlan} from '../models/MealPlan.js'; 

import { getWeekStartDate, pickRandomRecipe } from '../utils/mealPlan.utils.js';

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
        const allergies = user.preferences?.allergies || [];
        const cuisines = user.preferences?.cuisines || [];

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
                let recipes = await Recipe.find({
                    diet,
                    category: meal,
                    allergies: {$nin: allergies},
                    cuisines: {$in: cuisines}
                })

                if(recipes.length === 0) {
                    recipes = await Recipe.find({
                        diet,
                        category: meal,
                        allergies: {$nin: allergies}
                    })
                }

                if(recipes.length === 0) {
                    recipes = await Recipe.find({
                        diet,
                        category: meal
                    })
                }

                if(recipes.length === 0) {
                    recipes = await Recipe.find({
                        category: meal
                    })
                }

                const recipe = 
                    recipes.length > 0
                        ? recipes[Math.floor(Math.random() * recipes.length)]
                        : null;

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

const generateMealPlanInternal = async (userId) => {
    const user = await User.findById(userId);

    if(!user) return null;

    const diet = user.preferences?.diet;
    const allergies = user.preferences?.allergies || [];
    const cuisines = user.preferences?.cuisines || [];

    const weekStartDate = getWeekStartDate();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const meals = ['breakfast', 'lunch', 'dinner']

    const usedRecipeIds = new Set();
    const slots = {}

    for (const day of days) {
        slots[day] = {};

        for(const meal of meals) {
            let recipe = await pickRandomRecipe({
                diet,
                meal,
                allergies,
                cuisines
            })

            if(recipe && usedRecipeIds.has(recipe._id.toString())) {
                const alternatives = await Recipe.find({
                    category: meal,
                    _id: {$nin: [...usedRecipeIds]}
                });

                recipe = alternatives.length > 0
                    ? alternatives[Math.floor(Math.random() * alternatives.length)]
                    : recipe;
            }

            if(recipe) {
                usedRecipeIds.add(recipe._id.toString())
            }

            slots[day][meal] = recipe ? recipe._id : null
        }
    }

        return await MealPlan.create({
            userId,
            weekStartDate,
            slots
        })
}

export const currentWeekMealPlan = async (req, res) => {
    try {
        const userId = req.user.id
        const weekStartDate = getWeekStartDate();

        let mealPlan = await MealPlan.findOne({
            userId,
            weekStartDate
        }).populate('slots.Sunday.breakfast slots.Sunday.lunch slots.Sunday.dinner')
        .populate('slots.Monday.breakfast slots.Monday.lunch slots.Monday.dinner')
        .populate('slots.Tuesday.breakfast slots.Tuesday.lunch slots.Tuesday.dinner')
        .populate('slots.Wednesday.breakfast slots.Wednesday.lunch slots.Wednesday.dinner')
        .populate('slots.Thursday.breakfast slots.Thursday.lunch slots.Thursday.dinner')
        .populate('slots.Friday.breakfast slots.Friday.lunch slots.Friday.dinner')
        .populate('slots.Saturday.breakfast slots.Saturday.lunch slots.Saturday.dinner');

        if(!mealPlan) {
            const created = await generateMealPlanInternal(userId)

            mealPlan = await MealPlan.findById(created._id)
            .populate('slots.Sunday.breakfast slots.Sunday.lunch slots.Sunday.dinner')
            .populate('slots.Monday.breakfast slots.Monday.lunch slots.Monday.dinner')
            .populate('slots.Tuesday.breakfast slots.Tuesday.lunch slots.Tuesday.dinner')
            .populate('slots.Wednesday.breakfast slots.Wednesday.lunch slots.Wednesday.dinner')
            .populate('slots.Thursday.breakfast slots.Thursday.lunch slots.Thursday.dinner')
            .populate('slots.Friday.breakfast slots.Friday.lunch slots.Friday.dinner')
            .populate('slots.Saturday.breakfast slots.Saturday.lunch slots.Saturday.dinner')
        }

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

export const changeRecipe = async (req, res) => {
    try {
        const {day, meal} = req.body;
        const userId = req.user.id

        const weekStartDate = getWeekStartDate();
        const mealPlan = await MealPlan.findOne({userId, weekStartDate});

        if(!mealPlan) {
            return res.status(404).json({
                success: false,
                message: 'Meal plan not found'
            })
        }

        const user = await User.findById(userId);
        const newRecipe = await pickRandomRecipe({
            diet: user.preferences?.diet,
            meal,
            allergies: user.preferences?.allergies || [],
            cuisines: user.preferences?.allergies || []
        })

        if(!newRecipe) {
            return res.status(404).json({
                success: false,
                message: 'No alternative recipe found'
            });
        }

        mealPlan.slots[day][meal] = newRecipe._id;
        await mealPlan.save();

        const updatedPlan = await MealPlan.findById(mealPlan._id).populate(`
            slots.${day}.breakfast slots.${day}.lunch slots.${day}.dinner
        `)

        return res.status(200).json({
            success: true,
            message: 'Recipe changed',
            data: updatedPlan
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error changing recipe'
        })
    }
}