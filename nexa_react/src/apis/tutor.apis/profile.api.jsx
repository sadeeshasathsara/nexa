// services/tutorApi.js (frontend)
import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const tutorApi = {
  // Get current tutor's profile
  getProfile: async () => {
    try {
      const response = await api.get("/tutor/profile");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch tutor profile"
      );
    }
  },

  // Update tutor profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/tutor/profile", profileData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update tutor profile"
      );
    }
  },
};

export default tutorApi;
