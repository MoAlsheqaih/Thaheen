const { Router } = require("express");
const { isLoggedIn } = require("../utils");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

const router = Router();

// GET all progress for the authenticated user
router.get("/", async (req, res) => {
  try {
    if (!isLoggedIn(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's progress or an empty object if none exists
    res.json(user.progress || {});
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// PUT to update progress for the authenticated user
router.put("/", async (req, res) => {
  try {
    if (!isLoggedIn(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { progress } = req.body;

    // Validate the request body
    if (!progress || typeof progress !== "object") {
      return res.status(400).json({ error: "Invalid progress data" });
    }

    // Update the user's progress
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { progress },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser.progress);
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

module.exports = router;