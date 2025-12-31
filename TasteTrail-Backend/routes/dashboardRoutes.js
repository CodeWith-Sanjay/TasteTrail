import express from 'express';
import { accessTokenVerification } from '../middleware/authMiddleware.js';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/getDashboard', accessTokenVerification, async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Dashboard data fetched',
        data: req.user
    });
});

export default dashboardRoutes