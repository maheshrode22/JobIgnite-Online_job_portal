import axiosInstance from "./axiosInstance";

// ----------------- Authentication -----------------
export const registerSeeker = async (seekerData) =>
  axiosInstance.post("/jobSeekerRegister", seekerData, { headers: { "Content-Type": "application/json" } });

export const loginJobSeeker = async (credentials) =>
  axiosInstance.post("/jobseekerLogin", credentials, { headers: { "Content-Type": "application/json" } });

// ----------------- Profile CRUD -----------------
export const jobSeekerProfile = async (profileData) =>
  axiosInstance.post("/jobSeekerProfile", profileData, { headers: { "Content-Type": "application/json" } });

export const getProfileById = async (seeker_id) => axiosInstance.get(`/getProfile/${seeker_id}`);
export const getCompleteProfile = async (seeker_id) => axiosInstance.get(`/getCompleteProfile/${seeker_id}`);

export const updateProfile = async (profileData) =>
  axiosInstance.put("/updateJobSeekerProfile", profileData, { headers: { "Content-Type": "application/json" } });

export const updateJobSeekerProfile = async (formData) =>
  axiosInstance.put("/updateJobSeekerProfile", formData); // FormData handled automatically

// ----------------- Profile Sections -----------------
export const savePersonalInfo = async (data) =>
  axiosInstance.post("/profile/personal", data, { headers: { "Content-Type": "application/json" } });

export const saveEducation = async (data) =>
  axiosInstance.post("/profile/education", data, { headers: { "Content-Type": "application/json" } });

export const saveSkills = async (data) =>
  axiosInstance.post("/profile/skills", data, { headers: { "Content-Type": "application/json" } });

export const saveExperience = async (data) =>
  axiosInstance.post("/profile/experience", data, { headers: { "Content-Type": "application/json" } });

// ----------------- Job Management -----------------
export const getAllJobs = async () => axiosInstance.get("/viewAllJobPost");

export const applyForJob = async (seeker_id, job_id) =>
  axiosInstance.post("/jobSeekerApply", { seeker_id, job_id }, { headers: { "Content-Type": "application/json" } });

export const getSeekerApplications = async (seeker_id) => axiosInstance.get(`/trackApplication/${seeker_id}`);

// ----------------- Admin / Management -----------------
export const deleteSeeker = async (seeker_id) => axiosInstance.delete(`/deleteSeeker/${seeker_id}`);

export const updateSeeker = async (data) =>
  axiosInstance.put("/updateSeeker", data, { headers: { "Content-Type": "application/json" } });

// ----------------- Current User -----------------
export const getJobSeekerProfile = async () =>
  axiosInstance.post("/jobSeekerProfile", {}, { headers: { "Content-Type": "application/json" } });

// ----------------- File Uploads -----------------
export const uploadResume = async (seekerId, file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return axiosInstance.post(`/uploadResume/${seekerId}`, formData);
};

export const uploadProfileImage = async (seekerId, file) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  return axiosInstance.post(`/uploadProfileImage/${seekerId}`, formData);
};
