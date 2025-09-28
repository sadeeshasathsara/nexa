import BASE_URL from "../../tools/global.tools.js/baseUrl";

export async function adminLogin({ email, password }) {
  // Build URL-encoded body to avoid CORS preflight
  const body = new URLSearchParams({ email, password }).toString();

  const r = await fetch(`http://localhost:5000/api/v2/admin/login`, {
    method: "POST",
    credentials: "include",                    // send/receive cookie
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // simple request
    body,
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.message || `HTTP ${r.status}`);
  return data; // { ok, admin }
}
