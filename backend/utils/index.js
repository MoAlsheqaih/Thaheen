const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

const isLoggedIn = (req) => {
    // Check user's JWT token if it exists
    const token = req.headers["x-auth-token"];
    if (!token) return false;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return false;

        return true;
    } catch (error) {
        return false;
    }
};

const isQuestionMaster = async (req) => {
    // Check user's JWT token if it exists
    const token = req.headers["x-auth-token"];
    if (!token) return false;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return false;

        const user = await User.findById(decoded.userId);
        return user.role === "master";
    } catch (error) {
        return false;
    }
};

const isAdmin = async (req) => {
    // Check user's JWT token if it exists
    const token = req.headers["x-auth-token"];
    if (!token) return false;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return false;

        // Check if the user is an admin
        const user = await User.findById(decoded.userId);
        return user.role === "admin";
    } catch (error) {
        return false;
    }
};

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, name, otp) => {
    const response = await resend.emails.send({
        from: "Thaheen <thaheen@resend.dev>",
        to: [email],
        subject: "Login OTP",
        text: `Hello ${name},\n\nYour OTP is ${otp}.\n\nThank you for using our platform. Good luck!`,
    });

    return response;
};

module.exports = {
    isLoggedIn,
    isQuestionMaster,
    isAdmin,
    sendOTPEmail
};

