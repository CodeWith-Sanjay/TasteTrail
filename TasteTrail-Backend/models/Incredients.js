import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    canonicalName: {
        type: String,
        required: true
    },
    synonyms: {
        type: String
    },
    category: {
        type: String,
        enum: ['produce', 'dairy', 'spices', 'bakery', 'meat', 'pantry'],
        default: 'produce'
    }
});

export const Ingredients = mongoose.model('Ingredients', ingredientSchema);