import express from 'express';
import { editPreferences, setUserPreferences } from '../controllers/userController.js';
import { accessTokenVerification } from '../middleware/authMiddleware.js';
import { User } from '../models/User.js';

const userRoutes = express.Router();

userRoutes.get('/me', accessTokenVerification, async (req, res) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    return res.status(200).json({
        loggedIn: true,
        isOnboard: user.isOnboard
    })
});

userRoutes.put('/preferences', accessTokenVerification, setUserPreferences);
userRoutes.put('/editPreferences', accessTokenVerification, editPreferences);

export default userRoutes