import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

export const resetPassword = async (payload) => {
    try {
        const res = await axios.post(`${BASE_URL}/reset-password`, payload, { withCredentials: true });
        return res.data;
    } catch (e) {
        console.log(e);
        return e.message;
    }
}