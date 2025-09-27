export const ADMIN_ENV = {
  API_BASE: import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1",
};
// convenience: final admin base
export const ADMIN_API_BASE = `${ADMIN_ENV.API_BASE}/admin`;

