import axios from "axios";
import { ADMIN_API_BASE } from "./admin.env.config";

export const adminApi = axios.create({
  baseURL: ADMIN_API_BASE, // -> http://localhost:8000/api/v1/admin
});

adminApi.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("nexa_admin_token") ||
    sessionStorage.getItem("nexa_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
