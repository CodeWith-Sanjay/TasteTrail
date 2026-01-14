import {api} from './api.js';

export const registerUser = async (registerData) => {
    try {
        const res = await api.post('/auth/register', registerData);
        return res.data;
    } catch (error) {
        // console.log('Service error:', error?.response?.data || error.message);
        // return error.response?.data || {success: false, message: error.message}
        return {success: false, message: error.response?.data?.message || error.message}
    }
}

export const loginUser = async (loginData) => {
    try {
        const res = await api.post('/auth/login', loginData);
        console.log(import.meta.env.VITE_API_URL)
        return res.data;
    } catch (error) {
        return {success: false, message: error.response?.data?.message || error.message}
    }
}

export const logoutUser = async () => {
    try {
        const res = await api.post('/auth/logout', {}, {
            withCredentials: true
        });
        return res.data
    } catch (error) {
        return {success: false, message: error.response?.data?.message || error.message}
    }
}

export const checkProtectedRoutes = async () => {
    try {
        const res = await api.get('/auth/test');
        return res
    } catch (error) {
        return {success: false, message: error.response?.data?.message || error.message}
    }
}

