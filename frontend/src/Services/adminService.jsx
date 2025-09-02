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
export const viewSeeker = async (token) => {
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

// ✅ Token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Dashboard Stats Fetch
export const getDashboardStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard-stats`, {
      headers: getAuthHeaders(),
    });
    return res.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    throw error;
  }
};

// ✅ Generate Recent Activities (derived from stats)
export const getRecentActivities = async () => {
  try {
    const stats = await getDashboardStats();
    if (stats.success) {
      const activities = [];
      const now = new Date();

      if (stats.data.totalJobSeekers > 0) {
        activities.push({
          id: 1,
          message: `${stats.data.totalJobSeekers} Job Seekers registered`,
          createdAt: now,
        });
      }

      if (stats.data.totalHRs > 0) {
        activities.push({
          id: 2,
          message: `${stats.data.totalHRs} HRs onboarded`,
          createdAt: now,
        });
      }

      if (stats.data.totalJobs > 0) {
        activities.push({
          id: 3,
          message: `${stats.data.totalJobs} Jobs posted so far`,
          createdAt: now,
        });
      }

      if (stats.data.pendingApprovals > 0) {
        activities.push({
          id: 4,
          message: `${stats.data.pendingApprovals} HR approvals pending`,
          createdAt: now,
        });
      }

      return { success: true, activities };
    } else {
      return { success: false, activities: [] };
    }
  } catch (error) {
    console.error("Recent activities generation error:", error);
    return { success: false, activities: [] };
  }
};
