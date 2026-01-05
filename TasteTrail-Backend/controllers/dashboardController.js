import { User } from "../models/User.js";

export const getDashboard = async (req, res) => {
    try {
        const id = req.user.id

        const user = await User.findById(id).select('-password -refreshToken');

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Dashboard getting successful',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error getting dashboard',
            error: error.message
        })
    }
}