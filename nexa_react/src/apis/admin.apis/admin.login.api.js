import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1';

// Create axios instance with correct base URL
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 10000,
});

export async function adminLogin(credentials) {
  try {
    console.log('Sending login request to:', `${API_BASE}/admin/auth/login`);
    console.log('Credentials:', { email: credentials.email, password: '***' });
    
    const response = await api.post('/admin/auth/login', credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    throw error;
  }
}
