// Validation for Add Job form
function validateJobData(data) {
  const { title, company, opening, location, description, deadline } = data;

  if (!title || title.trim().length < 2) {
    return "Job title must be at least 2 characters long";
  }

  if (!company || company.trim().length < 2) {
    return "Company name must be at least 2 characters long";
  }

  if (!opening || isNaN(opening) || Number(opening) <= 0) {
    return "Please enter a valid number of openings";
  }

  if (!location || location.trim().length < 2) {
    return "Location is required";
  }

  if (!description || description.trim().length < 10) {
    return "Description must be at least 10 characters long";
  }

  if (!deadline) {
    return "Deadline is required";
  }

  return ""; // No errors
}

export { validateJobData };
