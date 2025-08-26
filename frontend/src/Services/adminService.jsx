import axios from "axios";

export const API_URL = "http://localhost:3000";

export const adminLogin = async ({ username, password }) => {
  const res = await axios.post(`${API_URL}/adminLogin`, { username, password }, {
    headers: { "Content-Type": "application/json" },
  });
  return res; // shape: { data: { msg, token, admin } }
};

export const viewHr = async (token) => {
  const res = await axios.get(`${API_URL}/viewAllHr`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};




export const viewSeeker = (token) => {
  return axios.get(`${API_URL}/viewAlljobSeeker`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};