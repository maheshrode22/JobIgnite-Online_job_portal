
import axios from "axios";

const API_URL = "http://localhost:3000"; // backend running port

// seeker Register function
export const registerSeeker = async (seekerData) => {
  return await axios.post(`${API_URL}/jobSeekerRegister`, seekerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const loginJobSeeker= async (credentials) => {
  return await axios.post(`${API_URL}/jobseekerLogin`, credentials, {
    headers: { "Content-Type": "application/json" },
  });
};


export const seekerProfile = async (profileData) => {
  return await axios.post(`${API_URL}/jobSeekerProfile`, profileData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getProfile = async (seekerId) => {
  return await axios.get(`${API_URL}/getProfile/${seekerId}`);
};


export const updateProfile = async (profileData) => {
  return await axios.put(`${API_URL}/updateJobSeekerProfile`, profileData, {
    headers: { "Content-Type": "application/json" },
  });
};


export const getAllJobs = async () => {
  return await axios.get(`${API_URL}/viewAllJobPost`);
};

