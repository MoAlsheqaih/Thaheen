const { Router } = require("express");
const { isLoggedIn } = require("../utils");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

const router = Router();

// Helper function to calculate streak
const calculateStreak = (submissionTimes) => {
    if (!submissionTimes || submissionTimes.length === 0) return 0;

    // Sort submission times in descending order (newest first)
    const sortedTimes = submissionTimes.sort((a, b) => b - a);

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    // Check each day backwards from today
    while (true) {
        // Check if there's a submission on this date
        const hasSubmission = sortedTimes.some(time => {
            const submissionDate = new Date(time);
            submissionDate.setHours(0, 0, 0, 0);
            return submissionDate.getTime() === currentDate.getTime();
        });

        if (!hasSubmission) break;

        streak++;
        // Move to previous day
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
};

// GET leaderboard data
router.get("/", async (req, res) => {
    try {
        if (!isLoggedIn(req)) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Get all users
        const users = await User.find({ role: { $ne: "admin" } }, "name progress");

        // Process each user's data
        const leaderboardData = users.map(user => {
            const progress = user.progress || new Map();
            const submissionTimes = [];
            let questionsSolved = 0;
            let totalPoints = 0;

            // Calculate metrics from progress
            progress.forEach((data, questionId) => {
                if (data.submitted) {
                    questionsSolved++;
                    if (data.correct) {
                        totalPoints += 2;
                    } else {
                        totalPoints += 1;
                    }
                    if (data.submissionTime) {
                        submissionTimes.push(data.submissionTime);
                    }
                }
            });

            const streak = calculateStreak(submissionTimes);

            return {
                userId: user._id,
                name: user.name.first,
                totalPoints,
                streak,
                questionsSolved
            };
        });

        // Sort by total points (descending)
        leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);

        const token = req.headers["x-auth-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({ leaderboardData, userId: decoded.userId });
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        res.status(500).json({ error: "Failed to fetch leaderboard data" });
    }
});

module.exports = router;