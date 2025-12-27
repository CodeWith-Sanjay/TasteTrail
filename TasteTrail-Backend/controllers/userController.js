import { User } from "../models/User.js";

export const setUserPreferences = async (req, res) => {
    try {
        const {diet, allergies, cuisines} = req.body;
        const id = req.user.id

        console.log("REQ.USER:", req.user);
        console.log("REQ.BODY:", req.body);

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
            cuisines: cuisines,
            isOboarded: true
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User preferences updated successfully',
            data: user.preferences
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error during setting preferences',
            error: error.message
        })
    }
}