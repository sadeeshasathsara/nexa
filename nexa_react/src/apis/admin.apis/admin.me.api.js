// src/apis/admin.apis/admin.me.api.js
const API = "http://localhost:5000";

export async function adminMe() {
  const r = await fetch(`${API}/api/v1/admin/me`, {
    method: "GET",
    credentials: "include",
  });
  if (r.status === 401) return null;
  const data = await r.json().catch(() => null);
  return data?.admin || null;
}
