const API = import.meta.env.VITE_API_HOST || "http://localhost:8000";

export async function adminLogin({ email, password }) {
  // Build URL-encoded body to avoid CORS preflight
  const body = new URLSearchParams({ email, password }).toString();

  const r = await fetch(`${API}/api/v1/admin/auth/login`, {
    method: "POST",
    credentials: "include",                    // send/receive cookie
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // simple request
    body,
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`);
  return data; // { ok, admin }
}
