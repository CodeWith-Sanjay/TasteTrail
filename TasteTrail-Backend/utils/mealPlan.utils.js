import { Recipe } from "../models/Recipe.js";

export const getWeekStartDate = () => {
    const now = new Date();
    const day = now.getDay();

    now.setDate(now.getDate() - day);
    now.setHours(0,0,0,0)

    return now
}

export const pickRandomRecipe = async ({diet, meal, allergies = [], cuisines = []}) => {
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

    return recipes.length > 0 
        ? recipes[Math.floor(Math.random() * recipes.length)]
        : null
}