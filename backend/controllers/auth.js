const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { readData, writeData } = require("../services/file")
const { authMiddleware, isAdmin } = require("../middleware/middleware")

const SECRET_KEY = "your_secret_key_here";

// ✅ Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });
    const data = readData();
    const existingUser = data.users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ error: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    data.users.push(newUser);
    writeData(data);
    res.status(201).json({ message: "User registered successfully", user: newUser});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = readData();
    const user = data.users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Login successful", token , user: {id: user.id, name: user.name, email: user.email, role: user.role} });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});


router.get("/my-creators", authMiddleware, (req, res) => {
  const data = readData();
  const myCreators = data.creators.filter((c) => c.userId === req.user.id);
  res.json(myCreators);
});

router.get("/user-auth", (req, res) => {
  res.status(200).send({ ok: true, user: req.user });
});

router.get("/admin-auth", (req, res) => {
  res.status(200).send({ ok: true, user: req.user });
});

module.exports = router;