import mongoose from 'mongoose';
import { Recipe } from '../models/Recipe.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

const recipes = [ {
    recipeName: "Masala Dosa",
    description: "Crispy South Indian dosa with spiced potato filling",
    category: "breakfast",
    diet: "vegetarian",
    cuisines: ["Indian"],
    allergies: ["gluten"],
    ingredients: [
      { name: "Rice batter", quantity: "2", unit: "cups" },
      { name: "Potato", quantity: "1", unit: "nos" },
      { name: "Onion", quantity: "1", unit: "nos" }
    ],
    makingSteps: "Prepare batter, cook dosa, add spiced potato filling",
    prepTime: 20,
    cookTime: 15,
    totalTime: 35
  },
   {
    recipeName: "Masala Dosa",
    description: "Crispy South Indian dosa with spiced potato filling",
    category: "breakfast",
    diet: "vegetarian",
    cuisines: ["Indian"],
    allergies: ["gluten"],
    ingredients: [
      { name: "Rice batter", quantity: "2", unit: "cups" },
      { name: "Potato", quantity: "1", unit: "nos" },
      { name: "Onion", quantity: "1", unit: "nos" }
    ],
    makingSteps: "Prepare batter, cook dosa, add spiced potato filling",
    prepTime: 20,
    cookTime: 15,
    totalTime: 35
  },
   {
    recipeName: "Scrambled Eggs",
    description: "Protein-packed breakfast",
    category: "breakfast",
    diet: "non-vegetarian",
    cuisines: ["Global"],
    allergies: ["egg", "dairy"],
    ingredients: [
      { name: "Eggs", quantity: "2", unit: "nos" },
      { name: "Butter", quantity: "1", unit: "tsp" },
      { name: "Salt", quantity: "1", unit: "pinch" }
    ],
    makingSteps: "Scramble eggs on pan with butter",
    prepTime: 5,
    cookTime: 5,
    totalTime: 10
  },
   {
    recipeName: "Scrambled Eggs",
    description: "Protein-packed breakfast",
    category: "breakfast",
    diet: "non-vegetarian",
    cuisines: ["Global"],
    allergies: ["egg", "dairy"],
    ingredients: [
      { name: "Eggs", quantity: "2", unit: "nos" },
      { name: "Butter", quantity: "1", unit: "tsp" },
      { name: "Salt", quantity: "1", unit: "pinch" }
    ],
    makingSteps: "Scramble eggs on pan with butter",
    prepTime: 5,
    cookTime: 5,
    totalTime: 10
  },
  {
    recipeName: "Tofu Stir Fry",
    description: "Healthy vegan tofu with veggies",
    category: "lunch",
    diet: "vegan",
    cuisines: ["Chinese"],
    allergies: ["soy"],
    ingredients: [
      { name: "Tofu", quantity: "200", unit: "grams" },
      { name: "Bell peppers", quantity: "1", unit: "cup" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" }
    ],
    makingSteps: "Stir fry tofu with veggies and sauce",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25
  },
  {
    recipeName: "Tofu Stir Fry",
    description: "Healthy vegan tofu with veggies",
    category: "lunch",
    diet: "vegan",
    cuisines: ["Chinese"],
    allergies: ["soy"],
    ingredients: [
      { name: "Tofu", quantity: "200", unit: "grams" },
      { name: "Bell peppers", quantity: "1", unit: "cup" },
      { name: "Soy sauce", quantity: "1", unit: "tbsp" }
    ],
    makingSteps: "Stir fry tofu with veggies and sauce",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25
  },
  {
    recipeName: "Veggie Pizza",
    description: "Vegetarian pizza with cheese",
    category: "dinner",
    diet: "vegetarian",
    cuisines: ["Italian"],
    allergies: ["gluten", "dairy"],
    ingredients: [
      { name: "Pizza base", quantity: "1", unit: "nos" },
      { name: "Cheese", quantity: "50", unit: "grams" },
      { name: "Vegetables", quantity: "1", unit: "cup" }
    ],
    makingSteps: "Assemble pizza and bake",
    prepTime: 10,
    cookTime: 20,
    totalTime: 30
  },
  {
    recipeName: "Chana Masala",
    description: "Spicy chickpea curry",
    category: "dinner",
    diet: "vegan",
    cuisines: ["Indian"],
    allergies: [],
    ingredients: [
      { name: "Chickpeas", quantity: "1", unit: "cup" },
      { name: "Onion", quantity: "1", unit: "nos" },
      { name: "Tomatoes", quantity: "2", unit: "nos" }
    ],
    makingSteps: "Cook chickpeas with onion, tomato and spices",
    prepTime: 10,
    cookTime: 25,
    totalTime: 35
  },
  {
    recipeName: "Grilled Salmon",
    description: "Healthy grilled salmon with herbs",
    category: "dinner",
    diet: "non-vegetarian",
    cuisines: ["Global"],
    allergies: ["fish"],
    ingredients: [
      { name: "Salmon", quantity: "1", unit: "fillet" },
      { name: "Olive oil", quantity: "1", unit: "tbsp" },
      { name: "Herbs", quantity: "1", unit: "tsp" }
    ],
    makingSteps: "Grill salmon with herbs and oil",
    prepTime: 10,
    cookTime: 15,
    totalTime: 25
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