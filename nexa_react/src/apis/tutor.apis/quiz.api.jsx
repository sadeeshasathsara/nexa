import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1/tutor";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const quizAPI = {
    // Create or update quiz
    saveQuiz: async (courseId, lessonId, quizData) => {
        try {
            const response = await apiClient.post(`/quizzes/course/${courseId}/lesson/${lessonId}`, quizData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to save quiz" };
        }
    },

    // Get quiz for a lesson
    getQuiz: async (courseId, lessonId) => {
        try {
            const response = await apiClient.get(`/quizzes/course/${courseId}/lesson/${lessonId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch quiz" };
        }
    },

    // Delete quiz
    deleteQuiz: async (courseId, lessonId) => {
        try {
            const response = await apiClient.delete(`/quizzes/course/${courseId}/lesson/${lessonId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to delete quiz" };
        }
    },

    // Publish/unpublish quiz
    publishQuiz: async (courseId, lessonId) => {
        try {
            const response = await apiClient.patch(`/quizzes/course/${courseId}/lesson/${lessonId}/publish`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to publish quiz" };
        }
    },
};

export default quizAPI;