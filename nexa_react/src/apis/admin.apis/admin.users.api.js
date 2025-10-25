// src/apis/admin.apis/admin.users.api.js
import api from "../admin.apis/api.instance.js"; // your axios instance (baseURL, creds)

export async function fetchUsers(params = {}) {
  const { q = "", role = "", status = "", page = 1, limit = 20, sort = "-createdAt" } = params;
  const { data } = await api.get("/admin/users", {
    params: { q, role, status, page, limit, sort },
  });
  return data?.data || { rows: [], total: 0, page: 1, limit: 20 };
}

export async function setUserSuspended(id, suspended) {
  const { data } = await api.patch(`/admin/users/${id}/suspend`, { suspended });
  return data?.data;
}
