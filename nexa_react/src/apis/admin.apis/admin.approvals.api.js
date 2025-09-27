// src/apis/admin.apis/admin.approvals.api.js
const API = import.meta.env.VITE_API_HOST || "http://localhost:5000";
const BASE = `${API}/api/v1/admin`;

export async function getPending(type) {
  const r = await fetch(`${BASE}/pending?type=${encodeURIComponent(type)}`, {
    credentials: "include",
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.items || [];
}

export async function decideByEmail({ type, email, action, reason }) {
  const r = await fetch(`${BASE}/decision/${encodeURIComponent(type)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, action, reason }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.item;
}

export async function getApproved(type, limit = 5) {
  const r = await fetch(
    `${BASE}/approved?type=${encodeURIComponent(type)}&limit=${limit}`,
    { credentials: "include" }
  );
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.items || [];
}
