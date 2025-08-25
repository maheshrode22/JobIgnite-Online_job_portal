
import axios from "axios";

const API_URL = "http://localhost:3000"; // backend running port

// seeker Register function
export const registerSeeker = async (seekerData) => {
  return await axios.post(`${API_URL}/jobSeekerRegister`, seekerData, {
    headers: {
      "Content-Type": "application/json"},
  });
};


export const loginJobSeeker= async (user) => {
  return await axios.post(`${API_URL}/jobseekerLogin`, user, {
    headers: { "Content-Type": "application/json" },
  });
};


export const jobSeekerProfile = async (profileData) => {
  return await axios.post(`${API_URL}/jobSeekerProfile`, profileData, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getProfileById = async (seeker_id) => {
  return await axios.get(`${API_URL}/getProfile/${seeker_id}`);
};


export const updateProfile = async (profileData) => {
  return await axios.put(`${API_URL}/updateJobSeekerProfile`, profileData, {
    headers: { "Content-Type": "application/json" },
  });
};


export const getAllJobs = async () => {
  return await axios.get(`${API_URL}/viewAllJobPost`);
};



export const applyForJob = async (seeker_id, job_id) => {
  return await axios.post(`${API_URL}/jobSeekerApply`, { seeker_id, job_id });
};


export const getSeekerApplications = async (seeker_id) => {
  return await axios.get(`${API_URL}/trackApplication/${seeker_id}`,);
};


export const deleteSeeker = async (seeker_id) => {
  return await axios.delete(`${API_URL}/deleteSeeker/${seeker_id}`);
};

export const updateSeeker = async (data) => {
  return await axios.put(`${API_URL}/updateSeeker`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

