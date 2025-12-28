const jwt = require("jsonwebtoken");
require("dotenv").config();
// check auth using jwt token
function checkAuthUsingJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token found" });
  }
  // Expect Bearer token
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }
  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized user / Invalid token",
      });
    }
    // attach user info from JWT
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
}
module.exports = checkAuthUsingJwt;
