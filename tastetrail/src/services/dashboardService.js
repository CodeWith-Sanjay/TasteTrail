import { api } from "./api.js";

export const getDashboard = async () => {
    try {
        const res = await api.get('/dashboard/getDashboard');
        return res.data
    } catch (error) {
        return {success: false, message: error.message}
    }
}