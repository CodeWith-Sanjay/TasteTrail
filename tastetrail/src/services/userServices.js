import { api } from "./api.js";

export const checkOnboardingStatus = async () => {
    try {
        const res = await api.get('/user/me');
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export const setUserPreferences = async (preferenceData) => {
    try {
        const res = await api.put('/user/preferences', preferenceData);
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}

export const editUserPreferences = async (preferenceData) => {
    try {
        const res = await api.put('/user/editPreferences', preferenceData);
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}