import axios from "axios";

const API_URL = "http://localhost:3000"; // backend running port

// HR Register function
export const registerHR = async (hrData) => {
  return await axios.post(`${API_URL}/hrregister`, hrData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ New function: Get all jobs by HR ID
export const getJobsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllPostHrById`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// ✅ Add Job function (fixed route name)
export const addJobPost = async (jobData) => {
  return await axios.post(`${API_URL}/createJobs`, jobData, {  // 👈 s add केलं
    headers: {
      "Content-Type": "application/json",
    },
  });
};
