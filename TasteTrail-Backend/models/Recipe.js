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
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
        default: null
    }
}, {timestamps: true});

export const Recipe = mongoose.model('Recipe', recipeSchema);