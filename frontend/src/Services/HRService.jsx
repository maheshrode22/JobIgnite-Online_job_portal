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
