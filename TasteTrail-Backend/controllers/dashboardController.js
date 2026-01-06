import { User } from "../models/User.js";
import { Recipe } from "../models/Recipe.js";

export const getDashboard = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findById(id).select('-password -refreshToken');

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Dashboard getting successful',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting dashboard',
            error: error.message
        })
    }
}

export const getTodayRecipe = async (req, res) => {
    try {
        const userId = req.user.id

        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const {diet, allergies = [], cuisines = []} = user.preferences

        const hour = new Date().getHours();
        let category;

        if(hour > 5 && hour < 12) {
            category = 'breakfast'
        } else if(hour >= 12 && hour < 17) {
            category = 'lunch';
        } else {
            category = 'dinner'
        }

        let recipe = null;
        let fallbackLevel = 'strict'

        //strict recipe
        recipe = await Recipe.findOne({
            diet,
            cuisines: {$in: cuisines},
            category,
            allergies: {$nin: allergies}
        });

        //without cuisines
        if(!recipe) {
            fallbackLevel = 'relaxed-cuisine'
            recipe = await Recipe.findOne({
                diet: diet,
                category,
                allergies: {$nin: allergies}
            })
        }

        //safe fallback (No allergies)
        if(!recipe) {
            fallbackLevel = 'safe'
            recipe = await Recipe.findOne({
                allergies: {$size: 0}
            })
        }

        //final fallback (anything)
        if(!recipe) {
            fallbackLevel = 'any'
            recipe = await Recipe.findOne();
        }

        if(!recipe) {
            return res.status(404).json({
                success: false,
                message: 'No matching recipes'
            });
        }

        // const todayRecipe = recipe[Math.floor(Math.random() * recipe.length)]

        return res.status(200).json({
            success: true,
            message: 'Getting today recipes successful',
            data: recipe,
            meta: {
                fallbackLevel
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting todays recipe',
            error: error.message
        })
    }
}