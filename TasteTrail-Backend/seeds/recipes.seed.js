import mongoose from 'mongoose';
import { Recipe } from '../models/Recipe.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

const recipes = [{
  recipeName: "Paneer Butter Masala",
  description: "Rich paneer curry",
  ingredients: [
    { name: "Paneer", quantity: 200, unit: "g" }
  ],
  makingSteps: "Cook paneer in butter gravy",
  prepTime: 15,
  cookTime: 25,
  totalTime: 40,
  diet: "vegetarian",
  allergies: ["dairy"],
  cuisines: ["Indian"],
  category: "dinner"
},
{
  recipeName: "Grilled Fish",
  description: "Healthy seafood dinner",
  ingredients: [
    { name: "Fish", quantity: 250, unit: "g" }
  ],
  makingSteps: "Grill fish with spices",
  prepTime: 10,
  cookTime: 20,
  totalTime: 30,
  diet: "non-vegetarian",
  allergies: ["seafood"],
  cuisines: ["Mediterranean"],
  category: "dinner"
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

seedRecipes();