import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1';

// Create axios instance with correct base URL
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 10000,
});

export const adminForgotPassword = async (data) => {
  try {
    console.log('Sending forgot password request to:', `${API_BASE}/admin/forgot`);
    console.log('Email:', data.email);
    
    const response = await api.post('/admin/forgot', data);
    console.log('Forgot password response:', response.data);
    
    return { 
      ok: true, 
      message: response.data.message 
    };
  } catch (error) {
    console.error('Forgot password API error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // Return error in consistent format
    return {
      ok: false,
      message: error.response?.data?.message || "Failed to send reset email",
    };
  }
};