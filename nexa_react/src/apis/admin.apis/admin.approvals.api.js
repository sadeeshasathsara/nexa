import BASE_URL from "../../tools/global.tools.js/baseUrl";

const API = import.meta.env.VITE_API_HOST || "http://localhost:5000";
const BASE = `${BASE_URL}/admin`;

/* -----------------------------
 * Tutor Approval APIs (new backend)
 * --------------------------- */

/** Get all pending tutors */
export async function getPending() {
  const r = await fetch(`${BASE}/tutors/pending`, {
    credentials: "include",
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.data || [];
}

/** Get approved tutors */
export async function getApproved(limit = 20) {
  const r = await fetch(`${BASE}/tutors/approved?limit=${limit}`, {
    credentials: "include",
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.data || [];
}

/** Approve or reject a tutor */
export async function decideTutor({ id, action, reason }) {
  const r = await fetch(`${BASE}/tutors/decision/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action, reason }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d?.message || `HTTP ${r.status}`);
  return d.data || null;
}
