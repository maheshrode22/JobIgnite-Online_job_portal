// Manual job validation (plain JavaScript, no libraries)
export const validateJobData = (data) => {
  let errors = [];

  if (!data.hr_id) {
    errors.push("HR ID is required");
  } else if (isNaN(data.hr_id)) {
    errors.push("HR ID must be a number");
  }

  if (!data.title || data.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.push("Company name must be at least 2 characters long");
  }

  if (!data.opening || isNaN(data.opening) || data.opening <= 0) {
    errors.push("Opening must be a positive number");
  }

  if (!data.experience_required) {
    errors.push("Experience required field is mandatory");
  }

  if (!data.location) {
    errors.push("Location is required");
  }

  if (!data.package) {
    errors.push("Package is required");
  }

  if (!data.skills_required) {
    errors.push("Skills are required");
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long");
  }

  if (!data.deadline) {
    errors.push("Deadline is required");
  } else {
    const deadlineDate = new Date(data.deadline);
    if (isNaN(deadlineDate.getTime())) {
      errors.push("Deadline must be a valid date");
    } else if (deadlineDate < new Date()) {
      errors.push("Deadline must be in the future");
    }
  }

  return errors;
};
