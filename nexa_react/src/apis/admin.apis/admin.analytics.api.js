import api from "./api.instance"; // keep instance in the same folder, or adjust path

// Summary cards
export const getAnalyticsSummary = async () => {
  const { data } = await api.get("/admin/analytics/summary");
  return data?.data;
};

// Tables
export const getQuizAttempts = async (params = {}) => {
  const { data } = await api.get("/admin/analytics/quiz-attempts", { params });
  return data;
};

export const getDonations = async (params = {}) => {
  const { data } = await api.get("/admin/analytics/donations", { params });
  return data;
};

export const getCourses = async (params = {}) => {
  const { data } = await api.get("/admin/analytics/courses", { params });
  return data;
};

// PDFs
export const downloadQuizAttemptsPDF = async () => {
  const res = await api.get("/admin/analytics/quiz-attempts/pdf", { responseType: "blob" });
  return res.data;
};

export const downloadDonationsPDF = async () => {
  const res = await api.get("/admin/analytics/donations/pdf", { responseType: "blob" });
  return res.data;
};

export const downloadCoursesPDF = async () => {
  const res = await api.get("/admin/analytics/courses/pdf", { responseType: "blob" });
  return res.data;
};
