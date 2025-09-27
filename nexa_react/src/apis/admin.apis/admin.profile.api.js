// src/apis/admin.apis/admin.profile.api.js
const API = import.meta.env.VITE_API_HOST || "http://localhost:5000";
const BASE = `${API}/api/v1/admin`;

export async function getAdminMe() {
  const r = await fetch(`${BASE}/me`, { credentials: "include" });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.admin;
}

export async function updateAdminMe(payload) {
  const r = await fetch(`${BASE}/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.admin;
}

export async function changeAdminPasswordApi(payload) {
  const r = await fetch(`${BASE}/me/password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d;
}

export async function registerNewAdmin(payload) {
  const r = await fetch(`${BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d;
}
