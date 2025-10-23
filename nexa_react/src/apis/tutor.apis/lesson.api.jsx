import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1/tutor";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const lessonAPI = {
  // Create new lesson
  createLesson: async (lessonData) => {
    try {
      const formData = new FormData();
      formData.append("courseId", lessonData.courseId);
      formData.append("title", lessonData.title);
      formData.append("description", lessonData.description || "");
      formData.append("orderIndex", lessonData.orderIndex || 0);

      if (lessonData.videoFile) {
        formData.append("video", lessonData.videoFile);
      }
      if (lessonData.materialFile) {
        formData.append("material", lessonData.materialFile);
      }

      const response = await apiClient.post("/lessons", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create lesson" };
    }
  },

  // Get lessons for a course
  getCourseLessons: async (courseId) => {
    try {
      const response = await apiClient.get(`/lessons/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch lessons" };
    }
  },

  // Get single lesson
  getLessonById: async (courseId, lessonId) => {
    try {
      const response = await apiClient.get(
        `/lessons/course/${courseId}/lesson/${lessonId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch lesson" };
    }
  },

  // Update lesson
  updateLesson: async (courseId, lessonId, lessonData) => {
    try {
      const formData = new FormData();
      formData.append("title", lessonData.title);
      formData.append("description", lessonData.description || "");
      formData.append("orderIndex", lessonData.orderIndex || 0);

      if (lessonData.videoFile) {
        formData.append("video", lessonData.videoFile);
      }
      if (lessonData.materialFile) {
        formData.append("material", lessonData.materialFile);
      }

      const response = await apiClient.put(
        `/lessons/course/${courseId}/lesson/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update lesson" };
    }
  },

  // Delete lesson
  deleteLesson: async (courseId, lessonId) => {
    try {
      const response = await apiClient.delete(
        `/lessons/course/${courseId}/lesson/${lessonId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete lesson" };
    }
  },
};

export default lessonAPI;
