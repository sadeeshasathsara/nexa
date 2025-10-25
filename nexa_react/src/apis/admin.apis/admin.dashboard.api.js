// src/apis/admin.apis/admin.dashboard.api.js
import api from "./api.instance.js";

/**
 * 🔵 Get Active Students Count
 * Backend route: GET /api/v1/admin/students/count
 * Returns: { success: true, count: <number> }
 */
export const getStudentCount = async () => {
  const { data } = await api.get("/admin/students/count");
  return data?.count ?? 0;
};

/**
 * 🟣 Get Course Categories for Subject Distribution Pie
 * Backend route: GET /api/v1/admin/dashboard/course-categories
 * Returns: { data: [{ name: "Programming", value: 5 }, ...] }
 */
export const getCourseCategories = async () => {
  const { data } = await api.get("/admin/dashboard/course-categories");
  return data?.data || [];
};

/**
 * 🟢 Get Sessions Chart Data
 * Backend route: GET /api/v1/admin/dashboard/sessions-chart
 * Returns: { data: [{ name: "2025-10-23", sessions: 10, tutors: 6 }, ...] }
 */
export const getSessionsChart = async () => {
  const { data } = await api.get("/admin/dashboard/sessions-chart");
  return data?.data || [];
};

/** Courses time-series */
export const getCoursesChart = async () => {
  const { data } = await api.get("/admin/dashboard/courses-chart");
  return data?.data || [];
};