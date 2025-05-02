const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { sendOTPEmail, isLoggedIn } = require("../utils");
const User = require("../models/userSchema");
const otpCodes = {};

const testEmails = ["rgu1@thaheen.com", "rgu2@thaheen.com", "master@thaheen.com", "admin@thaheen.com"];

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ email, password: hashedPassword, name: { first: firstName, last: lastName } });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        if (!testEmails.includes(email)) {
            otpCodes[email] = otp;
            await sendOTPEmail(email, user.name.first, otp);
        }

        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        console.error("Error logging in", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if ((!otpCodes[email] || otpCodes[email] != otp) && !testEmails.includes(email)) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    delete otpCodes[email];

    // Get user
    const user = await User.findOne({ email });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token, name: { first: user.name.first, last: user.name.last } });
});

router.get("/status", async (req, res) => {
    if (!isLoggedIn(req)) {
        return res.json({ role: null });
    }

    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    res.json({ role: user.role });
});

module.exports = router;
