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

// New function: Get all jobs by HR ID
export const getJobsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllPostHrById`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Add Job function (fixed route name)
export const addJobPost = async (jobData) => {
  return await axios.post(`${API_URL}/createJobs`, jobData, { 
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// services/hrService.js
export const getApplicationsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllApplicationByHR`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


export const hrLogin = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/hrlogin`, {
      hrUser: email,
      hrPass: password,
    });

    if (res.data.success && res.data.data?.length > 0) {
      return res.data.data[0]; // 1 HR object
    } else {
      throw new Error(res.data.msg || "Invalid login credentials ");
    }
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Something went wrong ");
  }
};