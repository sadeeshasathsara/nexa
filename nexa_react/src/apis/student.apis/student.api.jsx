// services/studentApi.js
import axios from "axios";
import BASE_URL from "../../tools/global.tools.js/baseUrl";

const API_BASE_URL = BASE_URL || "http://localhost:5000/api/v1";

const studentApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This will send cookies with requests
});

// Student dashboard API calls
export const studentApiService = {
  // Get dashboard data
  getDashboard: () => studentApi.get("/student/dashboard"),

  // Enroll in course
  enrollCourse: (courseId) => studentApi.post("/student/enroll", { courseId }),

  // Get course view
  getCourseView: (courseId) => studentApi.get(`/student/course/${courseId}`),

  // Get lesson content
  getLessonContent: (courseId, lessonId) =>
    studentApi.get(`/student/course/${courseId}/lesson/${lessonId}`),

  // Mark lesson as complete
  markLessonComplete: (courseId, lessonId) =>
    studentApi.post("/student/lesson/complete", { courseId, lessonId }),

  getQuiz: (courseId, lessonId) =>
    studentApi.get(`/student/course/${courseId}/lesson/${lessonId}/quiz`),
  submitQuiz: (data) => studentApi.post("/student/quiz/submit", data),

  // Get course materials
  getCourseMaterials: (courseId) =>
    studentApi.get(`/student/course/${courseId}/materials`),
};

export default studentApi;
