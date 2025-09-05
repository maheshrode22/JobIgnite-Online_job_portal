import axios from "axios";

const API_URL = "http://localhost:3000"; // backend running port

// 🔑 Helper function for auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔹 Seeker Register
export const registerSeeker = async (seekerData) => {
  return await axios.post(`${API_URL}/jobSeekerRegister`, seekerData, {
    headers: { "Content-Type": "application/json" },
  });
};

// 🔹 Login
export const loginJobSeeker = (credentials) => {
  return axios.post(`${API_URL}/jobseekerLogin`, credentials, {
    headers: { "Content-Type": "application/json" },
  });
};

// 🔹 Create Profile
export const jobSeekerProfile = async (profileData) => {
  return await axios.post(`${API_URL}/jobSeekerProfile`, profileData, {
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
};

// 🔹 Get Profile by ID
export const getProfileById = async (seeker_id) => {
  return await axios.get(`${API_URL}/getProfile/${seeker_id}`, {
    headers: getAuthHeaders(),
  });
};

// 🔹 Update Profile
export const updateProfile = async (profileData) => {
  return await axios.put(`${API_URL}/updateJobSeekerProfile`, profileData, {
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
};

// 🔹 Get All Jobs
export const getAllJobs = async () => {
  return await axios.get(`${API_URL}/viewAllJobPost`, {
    headers: getAuthHeaders(),
  });
};

// 🔹 Apply for Job
export const applyForJob = async (seeker_id, job_id) => {
  return await axios.post(
    `${API_URL}/jobSeekerApply`,
    { seeker_id, job_id },
    {
      headers: { 
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    }
  );
};

// 🔹 Get Seeker Applications
export const getSeekerApplications = async (seeker_id) => {
  return await axios.get(`${API_URL}/trackApplication/${seeker_id}`, {
    headers: getAuthHeaders(),
  });
};

// 🔹 Delete Seeker
export const deleteSeeker = async (seeker_id) => {
  return await axios.delete(`${API_URL}/deleteSeeker/${seeker_id}`, {
    headers: getAuthHeaders(),
  });
};

// 🔹 Update Seeker
export const updateSeeker = async (data) => {
  return await axios.put(`${API_URL}/updateSeeker`, data, {
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
};

// 🔹 Get Current Job Seeker Profile (from token)
export const getJobSeekerProfile = () => {
  return axios.post(
    `${API_URL}/jobSeekerProfile`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
};
