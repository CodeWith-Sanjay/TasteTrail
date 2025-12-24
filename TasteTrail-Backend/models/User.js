import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    dietType: {
        type: String,
        enum: ['vegan', 'vegetarian', 'keto', 'low-carb', 'gluten-free', 'non-veg']
    },

    allergies: [{
        type: String, 
        enum: [
            'nuts',
            'dairy',
            'soy',
            'gluten',
            'seafood',
            'eggs'
        ]
    }],

    cuisinePreferences: [{
        type: String,
        enum: [
            'indian',
            'italian',
            'chinese',
            'mexican',
            'thai',
            'american',
            'mediterranean'
        ]
    }],

    onBoardingCompleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);