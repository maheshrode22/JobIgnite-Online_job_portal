const jwt = require("jsonwebtoken");

const jobseekerAuth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is jobseeker
    if (decoded.role !== "jobseeker") {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied. Job seeker role required." 
      });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid token." 
    });
  }
};

module.exports = jobseekerAuth; 