// src/apis/admin.apis/admin.dashboard.api.js
const API = import.meta.env.VITE_API_HOST || "http://localhost:5000";

export async function getStudentCount() {
  const res = await fetch(`${API}/api/v1/admin/students/count`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || `HTTP ${res.status}`);
  }

  // ✅ Backend returns { success: true, count: 2 }
  return data?.count || 0;
}
