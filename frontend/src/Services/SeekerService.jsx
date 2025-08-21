
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
