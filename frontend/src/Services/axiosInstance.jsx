// src/services/axiosInstance.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Check for HR token first, then job seeker token, then generic token
    const hrToken = localStorage.getItem("hr_token");
    const jobSeekerToken = localStorage.getItem("jobseeker_token");
    const token = localStorage.getItem("token"); // Generic token for job seekers
    const adminToken = localStorage.getItem("admin_token");
    
    if (hrToken) {
      config.headers.Authorization = `Bearer ${hrToken}`;
    } else if (jobSeekerToken) {
      config.headers.Authorization = `Bearer ${jobSeekerToken}`;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
