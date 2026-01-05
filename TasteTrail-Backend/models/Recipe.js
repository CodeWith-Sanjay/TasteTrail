import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    recipePhotos: [{
        type: String
    }],
    ingredients: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        unit: {type: String}
    }],
    makingSteps: {type: String},
    prepTime: {type: Number},
    cookTime: {type: Number},
    totalTime: {type: Number},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratingAverage: {
        type: Number,
        default: 0
    },
    diet: {
        type: String,
        enum: ['vegan', 'vegetarian', 'non-vegetarian', 'keto', 'gluten-free'],
        required: true
    },
    allergies: [{
        type: String
    }],
    cuisines: [{
        type: String
    }],
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
        default: null
    }
}, {timestamps: true});

export const Recipe = mongoose.model('Recipe', recipeSchema);