import mongoose from 'mongoose';
import { Recipe } from '../models/Recipe.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

const recipes = [{
  recipeName: "Vegetable Upma",
  description: "South Indian breakfast",
  ingredients: [
    { name: "Rava", quantity: 1, unit: "cup" },
    { name: "Vegetables", quantity: 1, unit: "cup" }
  ],
  makingSteps: "Cook rava with vegetables",
  prepTime: 10,
  cookTime: 15,
  totalTime: 25,
  diet: "vegetarian",
  allergies: ["gluten"],
  cuisines: ["Indian"],
  category: "breakfast"
},
{
  recipeName: "Poha",
  description: "Light Indian breakfast",
  ingredients: [
    { name: "Flattened Rice", quantity: 1, unit: "cup" }
  ],
  makingSteps: "Cook poha with spices",
  prepTime: 10,
  cookTime: 10,
  totalTime: 20,
  diet: "vegetarian",
  allergies: [],
  cuisines: ["Indian"],
  category: "breakfast"
},
{
  recipeName: "Smoothie Bowl",
  description: "Healthy fruit bowl",
  ingredients: [
    { name: "Banana", quantity: 1, unit: "pcs" },
    { name: "Berries", quantity: 1, unit: "cup" }
  ],
  makingSteps: "Blend fruits and serve",
  prepTime: 5,
  cookTime: 0,
  totalTime: 5,
  diet: "vegan",
  allergies: [],
  cuisines: ["American"],
  category: "breakfast"
}
]

export const seedRecipes = async () => {
    try {
        await Recipe.insertMany(recipes);
        console.log('Recipe inserted')
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}