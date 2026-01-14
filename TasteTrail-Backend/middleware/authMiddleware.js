import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "../config/token.js";
import {User} from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET

export const refreshTokenVerification = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return null;

    try {
        const decoded = verifyRefreshToken(refreshToken);

        if(!decoded || !decoded.id) return null;

        const user = await User.findOne({refreshToken: refreshToken});
        if(!user) {
            return null
        }

        const newAccessToken = generateAccessToken({id: decoded.id, role: decoded.role});
        console.log('New access token generated👍: ', newAccessToken);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 //1 hour
        })

        return newAccessToken;
    } catch (error) {
        console.log('Refresh token verification error❌: ', error.message);
        return null
    }
}

export const accessTokenVerification = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;

    try {

        if(!accessToken) {
        accessToken = await refreshTokenVerification(req, res);

            if(!accessToken) {
                return res.status(401).json({
                    success: false,
                    message: '❌ No access token provided'
                })
            }
        }
        const decoded = await verifyAccessToken(accessToken);

        if(!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: '❌ Invalid access token'
            })
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        return next();

    } catch (error) {

        if(error.name === 'TokenExpiredError') {
            const newAccessToken = await refreshTokenVerification(req, res);

            if(!newAccessToken) {
                return res.status(401).json({
                    success: false,
                    message: 'refresh token expired ❌'
                })
            }

            const decoded = await verifyAccessToken(newAccessToken);
            req.user = {
                id: decoded.id,
                role: decoded.role
            }

            return next();
        }

        console.log('Access token verification error: ', error.message);
        return res.status(500).json({
            success: false,
            message: '❌ Server error during access token verification',
            error: error.message
        })
    }
}