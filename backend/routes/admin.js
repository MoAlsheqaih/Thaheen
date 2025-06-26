const { Router } = require("express");
const jwt = require("jsonwebtoken");

const Question = require("../models/questionSchema");
const Course = require("../models/courseSchema");
const User = require("../models/userSchema");
const { isAdmin } = require("../utils");

const router = Router();

// GET all users
router.get("/users", async (req, res) => {
    try {
        if (!(await isAdmin(req))) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const users = await User.find({ role: { $ne: "admin" } }, "name email progress role");

        // Transform users to include questions solved count
        const usersWithProgress = users.map(user => {
            const progress = user.progress || new Map();
            let questionsSolved = 0;

            for (const [_, value] of progress.entries()) {
                if (value.submitted) {
                    questionsSolved++;
                }
            }

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                questionsSolved: questionsSolved
            };
        });

        res.json(usersWithProgress);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// DELETE a user
router.delete("/users/:userId", async (req, res) => {
    try {
        if (!(await isAdmin(req))) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { userId } = req.params;

        // Prevent deleting yourself
        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId === userId) {
            return res.status(400).json({ error: "Cannot delete your own account" });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

// PUT to change user role
router.put("/users/:userId/role", async (req, res) => {
    try {
        if (!(await isAdmin(req))) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { userId } = req.params;
        const { role } = req.body;

        // Validate role
        if (!["regular", "master"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        // Prevent changing your own role
        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId === userId) {
            return res.status(400).json({ error: "Cannot change your own role" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true, select: "name email role" }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ error: "Failed to update user role" });
    }
});

router.get("/statistics", async (req, res) => {
    try {
        if (!(await isAdmin(req))) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const courses = await Course.countDocuments();
        const questions = await Question.countDocuments();
        const users = await User.countDocuments({ role: { $ne: "admin" } });

        res.json({ courses, users, questions });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
});

router.get("/most-active", async (req, res) => {
    try {
        if (!(await isAdmin(req))) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Get users and calculate their points justt like in the leaderboard
        const users = await User.find({ role: { $ne: "admin" } }, "name progress");

        // Process each user's data
        const mostActiveData = users.map(user => {
            const progress = user.progress || new Map();
            let totalPoints = 0;

            // Calculate metrics from progress
            progress.forEach((data) => {
                if (data.submitted) {
                    if (data.correct) {
                        totalPoints += 2;
                    } else {
                        totalPoints += 1;
                    }
                }
            });

            return {
                userId: user._id,
                name: user.name,
                totalPoints
            };
        });

        res.json(mostActiveData.sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 3));
    } catch (error) {
        console.error("Error fetching most active users:", error);
        res.status(500).json({ error: "Failed to fetch most active users" });
    }
});


module.exports = router; 