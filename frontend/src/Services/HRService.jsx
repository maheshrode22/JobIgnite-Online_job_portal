import axios from "axios";
 
const API_URL = "http://localhost:3000"; 
 
// HR Register function
export const registerHR = async (hrData) => {
  return await axios.post(`${API_URL}/hrregister`, hrData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
 
// Add Job function
export const addJobPost = async (jobData) => {
  return await axios.post(`${API_URL}/createJobs`, jobData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
 
// Get all jobs by HR ID
export const getJobsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllPostHrById`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
 
// Get applications by HR
export const getApplicationsByHR = async (hr_id) => {
  return await axios.post(`${API_URL}/viewAllApplicationByHR`, { hr_id }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
 
// Update HR Profile
export const updateHr = (id, hrData) => {
  return axios.put(`${API_URL}/updateHr/${id}`, hrData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
 
// Delete Job
export const deleteJob = (id) => {
  return axios.post(`${API_URL}/deletePost`, { id });
};
 

 
// HR Login
export const hrLogin = async (email, password) => {
  const res = await axios.post(`${API_URL}/hrlogin`, { hrUser: email, hrPass: password }, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
 
// Get current HR
export const getHRMe = async () => {
  const res = await axios.get(`${API_URL}/hr/me`);
  return res.data;
};
 
// Update Job
export const updateJob = async (id, jobData) => {
  const res = await axios.put(`${API_URL}/updateJob/${id}`, jobData, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};