// frontend/validation/hrRegister.js

export function validateHRData({ name, company, email, password, phone }) {
  // Name validation
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }

  // Company validation
  if (!company || company.trim().length < 2) {
    return "Company name must be at least 2 characters long";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  // Password validation
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  // Phone validation (10–15 digits)
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    return "Phone number must be 10–15 digits";
  }

  // If all validations pass, return empty string
  return "";
}
