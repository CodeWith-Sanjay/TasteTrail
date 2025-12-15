import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    weekStartDate: {
        type: Date,
        required: true
    },
    slots: {
        Sunday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        },
        Monday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        },
        Tuesday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        },
        Wednesday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        },
        Thursday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        },
        Friday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        },
        Saturday: {
            breakfast: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            lunck: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'},
            dinner: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}
        }
    },

    notes: {
        type: String
    }
}, {timestamps: true});

export const MealPlan = mongoose.model('MealPlan', mealPlanSchema);