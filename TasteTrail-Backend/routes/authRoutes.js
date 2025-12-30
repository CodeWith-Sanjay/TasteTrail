import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { accessTokenVerification } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.post('/logout', logoutUser);

authRoutes.get('/test', accessTokenVerification, (req, res) => {
    return res.status(200).json({
        message: 'Authenticated',
        user: req.user
    })
})

export default authRoutes;