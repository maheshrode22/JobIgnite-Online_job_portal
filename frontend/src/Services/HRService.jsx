import axios from "axios";
 
const API_URL = "http://localhost:3000"; 
 
// Helper: get auth header from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("hr_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
 
// HR Register function
export const registerHR = async (hrData) => {
  return await axios.post(`${API_URL}/hrregister`, hrData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
 
// New function: Get all jobs by HR ID
export const getJobsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllPostHrById`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
};
 
// Add Job function (fixed route name)
export const addJobPost = async (jobData) => {
  return await axios.post(`${API_URL}/createJobs`, jobData, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
};
 
// services/hrService.js
export const getApplicationsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllApplicationByHR`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
};
 
export const deleteJob = (id) => {
  return axios.post(`${API_URL}/deletePost`, { id }, { headers: getAuthHeaders() });
};

// HR Register (duplicate fixed or remove usage sites to use registerHR)
export const hrRegister = async (data) => {
  const res = await axios.post(`${API_URL}/hrregister`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// HR Login - accepts email and password, matches backend payload keys
export const hrLogin = async (email, password) => {
  const res = await axios.post(`${API_URL}/hrlogin`, { hrUser: email, hrPass: password }, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data; // { success, msg, token, user }
};

// Get current HR (Protected)
export const getHRMe = async () => {
  const res = await axios.get(`${API_URL}/hr/me`, {
    headers: { ...getAuthHeaders() },
  });
  return res.data;
};