import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "../config/token.js";
import {User} from '../models/User.js';

export const refreshTokenVerification = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return null;

    try {
        const decoded = verifyRefreshToken(refreshToken);
        console.log('Refresh token decoded data: ', decoded);

        if(!decoded || !decoded.id) return null;

        // const user = await User.findOne({refreshToken: refreshToken});
        // if(!user) {
        //     return null
        // }

        const newAccessToken = generateAccessToken({id: decoded._id, role: decoded.role});
        console.log('New access token generated: ', newAccessToken);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 //1 hour
        })

        return newAccessToken;
    } catch (error) {
        console.log('Refresh token verification error: ', error.message);
        return null
    }
}

export const accessTokenVerification = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;

    if(!accessToken) {
        accessToken = await refreshTokenVerification(req, res, next);

        if(!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'No access token provided'
            })
        }
    }

    try {
        const decoded = verifyAccessToken(accessToken);

        // if(!decoded || !decoded.id) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Invalid access token'
        //     })
        // }

        req.user = {
            id: decoded.id
        }

        return next();

    } catch (error) {

        // if(error.name === 'TokenExpiredError') {
        //     const newAccessToken = await refreshTokenVerification(req, res, next);

        //     if(!newAccessToken) {
        //         return res.status(401).json({
        //             success: false,
        //             message: 'Access token expired and refresh token invalid'
        //         })

        //         const decoded = verifyAccessToken(newAccessToken);
        //         req.user = {
        //             id: decoded.id
        //         }

        //         return next();
        //     }
        // }
        console.log('Access token verification error: ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server error during access token verification',
            error: error.message
        })
    }
}