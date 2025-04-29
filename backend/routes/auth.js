const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

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
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// TODO: Use this as two steps: login then OTP confirmation
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

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

        res.json({ token, name: user.name });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

router.get("/status", (req, res) => {
    if (!isLoggedIn(req)) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers["X-Auth-Token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ role: decoded.role });
});

module.exports = router;
