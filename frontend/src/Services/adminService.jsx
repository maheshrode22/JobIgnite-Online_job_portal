import axios from "axios";
 
const API_URL = "http://localhost:3000"; 

export const adminLogin = async (user) => {
  return await axios.post(`${API_URL}/adminLogin`, user, {
    headers: { "Content-Type": "application/json" },
  });
};

export const viewHr = (token) => {
  return axios.get(`${API_URL}/viewAllHr`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};




export const viewSeeker = (token) => {
  return axios.get(`${API_URL}/viewAlljobSeeker`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};