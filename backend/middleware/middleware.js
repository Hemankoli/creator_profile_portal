const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key_here";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

function isAdmin(req, res, next) {
  const data = readData();
  const user = data.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  next();
}

module.exports = { authMiddleware, isAdmin };
