import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1/tutor";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This will include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const courseAPI = {
  // Get all courses for tutor
  getTutorCourses: async () => {
    try {
      const response = await apiClient.get("/course");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch courses" };
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      // For form data with file upload
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("category", courseData.category || "");

      if (courseData.imageFile) {
        formData.append("image", courseData.imageFile);
      }

      const response = await apiClient.post("/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create course" };
    }
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    try {
      // For form data with file upload
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("category", courseData.category || "");
      formData.append("status", courseData.status || "draft");

      if (courseData.imageFile) {
        formData.append("image", courseData.imageFile);
      }

      const response = await apiClient.put(`/course/${courseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update course" };
    }
  },

  // Delete course
  deleteCourse: async (courseId) => {
    try {
      const response = await apiClient.delete(`/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete course" };
    }
  },

  // Get single course details
  getCourseById: async (courseId) => {
    try {
      const response = await apiClient.get(`/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch course" };
    }
  },
};

export default courseAPI;
