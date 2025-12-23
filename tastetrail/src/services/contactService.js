import { api } from "./api.js";

export const sendContactMessage = async (contactData) => {
    try {
        const res = await api.post('/contact/sendEmail', contactData);
        return res.data
    } catch (error) {
        return {error: error.message};
    }
}