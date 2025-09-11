// validators/hrValidator.js

// Simple synchronous validation — no DB check here
function validateHRData({ name, company, email, password, phone }) {
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (!company || company.trim() === "") {
    return "Company name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return "Phone number must be 10–15 digits";
  }

  return ""; // valid
}

module.exports = {
  validateHRData,
};
