import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";


export const otpApi = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/otp`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.log(e);
        if (e.response?.data) {
            return e.response.data;
        }
        return { success: false, message: e.message }
    }
}

export const validateOtpApi = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/otp-validate`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.log(e);
        if (e.response?.data) {
            return e.response.data;
        }
        return { success: false, message: e.message }
    }
}