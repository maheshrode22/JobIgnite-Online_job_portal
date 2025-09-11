// src/validation/jobValidation.js

function validateJobData(data) {
    const {
        hr_id,
        title,
        company,
        opening,
        experience_required,
        location,
        package,
        skills_required,
        description,
        deadline
    } = data;

    if (!hr_id) return "HR ID is required";

    if (!title || title.trim().length < 2) {
        return "Job title must be at least 2 characters long";
    }

    if (!company || company.trim().length < 2) {
        return "Company name is required";
    }

    if (!opening || isNaN(opening) || opening <= 0) {
        return "Number of openings must be a positive number";
    }

    if (!experience_required || experience_required.trim().length === 0) {
        return "Experience required is mandatory";
    }

    if (!location || location.trim().length === 0) {
        return "Job location is required";
    }

    if (!package || package.trim().length === 0) {
        return "Package/salary is required";
    }

    if (!skills_required || skills_required.trim().length === 0) {
        return "Skills required is mandatory";
    }

    if (!description || description.trim().length === 0) {
        return "Job description is required";
    }

    if (!deadline || isNaN(Date.parse(deadline))) {
        return "Valid deadline date is required";
    }

    return ""; // ✅ No errors
}

module.exports = { validateJobData };
