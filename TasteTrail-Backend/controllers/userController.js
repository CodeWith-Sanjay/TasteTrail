import { User } from "../models/User.js";

export const setUserPreferences = async (req, res) => {
    try {
        const {diet, allergies, cuisines} = req.body;
        const id = req.user.id

        if(!diet || !Array.isArray(allergies) || !Array.isArray(cuisines)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid preferences data'
            })
        }

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.preferences = {
            diet: diet,
            allergies: allergies,
            cuisines: cuisines
        }

        user.isOnboard = true;

        await user.save();

        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isOnboard: user.isOnboard,
            preferences: user.preferences
        }

        return res.status(200).json({
            success: true,
            message: 'User preferences updated successfully',
            data: safeUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error during setting preferences',
            error: error.message
        })
    }
}

export const editPreferences = async (req, res) => {
    try {
        const {diet, allergies, cuisines} = req.body;
        const id = req.user.id

        if(!diet) {
            return res.status(400).json({
                success: false,
                message: 'Diet is required'
            });
        }

        const user = await User.findByIdAndUpdate(id, {
            preferences: {
                diet: diet,
                allergies: allergies || [],
                cuisines: cuisines || []
            }
        }, {new: true}).select('preferences isOnboard');

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Preferences updated successfully',
            data: user
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error during editing preferences',
            error: error.message
        });
    }
}