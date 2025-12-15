import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weekStartDate: {
        type: Date,
        required: true
    },
    items: [{
        ingredients: {type: String, required: true},
        quantity: {type: Number, default: 1},
        unit: {type: String},
        category: {
            type: String,
            enum: ['produce', 'dairy', 'spices', 'bakery', 'meat', 'pantry']
        },
        checked: {type: Boolean, default: false}
    }]
}, {timestamps: true});

export const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);