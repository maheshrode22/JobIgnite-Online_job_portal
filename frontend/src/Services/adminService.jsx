import axios from "axios";

export const API_URL = "http://localhost:3000";

// ✅ Admin Login
export const adminLogin = async ({ username, password }) => {
  return await axios.post(`${API_URL}/adminLogin`, { username, password }, {
    headers: { "Content-Type": "application/json" },
  });
};

// ✅ View All HR
export const viewHr = async (token) => {
  return await axios.get(`${API_URL}/viewAllHr`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ View All Job Seekers
export const viewSeeker = (token) => {
  return axios.get(`${API_URL}/viewAlljobSeeker`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Update HR Status
export const updateHrStatus = async (id, status, token) => {
  return await axios.post(
    `${API_URL}/updateStatusHr`,
    { id, status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
