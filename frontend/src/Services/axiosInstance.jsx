// src/services/axiosInstance.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Automatically attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
