import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

const API_BASE_URL = BASE_URL || "http://localhost:5000/api/v1";

// Create axios instance with credentials
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Chat API functions
export const chatAPI = {
  // Get user's courses (student gets enrolled courses, tutor gets their courses)
  getStudentCourses: async () => {
    try {
      const response = await apiClient.get("/student/chat/courses");
      return response.data;
    } catch (error) {
      console.error("Error fetching student courses:", error);
      throw error;
    }
  },

  getTutorCourses: async () => {
    try {
      const response = await apiClient.get("/student/chat/tutor/courses");
      return response.data;
    } catch (error) {
      console.error("Error fetching tutor courses:", error);
      throw error;
    }
  },

  // Get chat list for a specific course
  getCourseChats: async (courseId) => {
    try {
      const response = await apiClient.get(
        `/student/chat/courses/${courseId}/chats`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching course chats:", error);
      throw error;
    }
  },

  // Get messages between two users in a course
  getMessages: async (courseId, otherUserId) => {
    try {
      const response = await apiClient.get(
        `/student/chat/courses/${courseId}/messages/${otherUserId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    try {
      const response = await apiClient.post(
        "/student/chat/messages",
        messageData
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  // Mark messages as read
  markAsRead: async (readData) => {
    try {
      const response = await apiClient.patch(
        "/student/chat/messages/read",
        readData
      );
      return response.data;
    } catch (error) {
      console.error("Error marking messages as read:", error);
      throw error;
    }
  },

  // Get total unread message count
  getUnreadCount: async () => {
    try {
      const response = await apiClient.get("/student/chat/unread-count");
      return response.data;
    } catch (error) {
      console.error("Error fetching unread count:", error);
      throw error;
    }
  },
};

export default chatAPI;
