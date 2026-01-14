import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../config/token.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            console.log("User exist error: ", existingUser);
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        const accessToken = generateAccessToken({id: newUser._id, email: newUser.email, role: newUser.role});
        const refreshToken = generateRefreshToken({id: newUser._id, email: newUser.email, role: newUser.role});

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 //1 day
        });

        newUser.refreshToken = refreshToken;
        await newUser.save();        

        const safeUser = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            isOnboard: newUser.isOnboard
        }

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: safeUser
        })
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({email: email});
        if(!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const accessToken = generateAccessToken({id: existingUser._id, email: existingUser.email, role: existingUser.role});
        const refreshToken = generateRefreshToken({id: existingUser._id, email: existingUser.email, role: existingUser.role});

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 60 * 60 * 1000 //1 hour
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 //1 day
        });

        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        const safeUser = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            isOnboard: existingUser.isOnboard
        }

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: safeUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;

        console.log('Cookies:', req.cookies);
        
        if(refreshToken) {
            const user = await User.findOne({refreshToken: refreshToken});
            if(user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}