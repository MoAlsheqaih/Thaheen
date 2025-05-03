const { Router } = require("express");
const { isLoggedIn } = require("../utils");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");
const Question = require("../models/questionSchema");

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

    // Fetch the current user and their previous progress
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const prevProgress = user.progress || {};

    // For each question in the new progress, compare and update Question stats
    for (const [questionId, newData] of Object.entries(progress)) {
      const prevData = prevProgress.get(questionId) || {};
      const updates = {};

      const question = await Question.findById(questionId);
      if (!question) continue;

      // 1. Submission logic
      if (!prevData.submitted && newData.submitted) {
        // User just submitted
        updates.$inc = { totalSubmissions: 1 };
        // Increment selected option's count
        if (newData.selectedAnswerId) {
          const optionIndex = question.options.findIndex(opt => opt.id === newData.selectedAnswerId);
          if (optionIndex !== -1) {
            question.options[optionIndex].count += 1;
          }
        }
      }
      // 2. Rating logic
      const prevRated = typeof prevData.userRating === "number";
      const newRated = typeof newData.userRating === "number";
      if (!prevRated && newRated) {
        // User just rated
        updates.$inc = { ...(updates.$inc || {}), totalRaters: 1, totalRatings: newData.userRating };
      } else if (prevRated && newRated && prevData.userRating !== newData.userRating) {
        // User changed their rating
        updates.$inc = { ...(updates.$inc || {}), totalRatings: newData.userRating - prevData.userRating };
      }
      // Save option count change if needed
      if (updates.$inc) {
        await Question.findByIdAndUpdate(questionId, updates);
      }
      // Save options array if changed
      if (!prevData.submitted && newData.submitted && newData.selectedAnswerId) {
        await question.save();
      }
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