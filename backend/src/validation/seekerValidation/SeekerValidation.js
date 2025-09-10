// src/validation/jobSeekerValidation.js

function validateJobSeeker(data) {
    const { name, email, password, phone, address } = data;

    if (!name || name.trim().length < 2) {
        return "Name must be at least 2 characters long";
    }

    if (!email || !email.includes("@")) {
        return "Please enter a valid email address";
    }

    if (!password || password.length < 6) {
        return "Password must be at least 6 characters long";
    }

    if (!phone || phone.trim().length < 10) {
        return "Phone number must be at least 10 digits";
    }

    if (!address || address.trim().length === 0) {
        return "Address is required";
    }

    return ""; // No errors
}

module.exports = { validateJobSeeker };
