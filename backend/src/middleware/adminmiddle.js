const jwt = require("jsonwebtoken");
const Secret_key = "its_mySecrate_Key";

function verifyAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token provided" });

  jwt.verify(token, Secret_key, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid or expired token" });
    req.admin = decoded;
    next();
  });
}

module.exports = verifyAdminToken;
