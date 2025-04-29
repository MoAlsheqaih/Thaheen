const jwt = require("jsonwebtoken");

const isLoggedIn = (req) => {
    // Check user's JWT token if it exists
    const token = req.headers["X-Auth-Token"];
    if (!token) return false;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return false;

    return true;
};

const isQuestionMaster = (req) => {
    // Check user's JWT token if it exists
    const token = req.headers["X-Auth-Token"];
    if (!token) return false;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return false;

    // Check if the user is a question master
    return decoded.role === "master";
};

const isAdmin = (req) => {
    // Check user's JWT token if it exists
    const token = req.headers["X-Auth-Token"];
    if (!token) return false;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return false;

    // Check if the user is an admin
    return decoded.role === "admin";
};

module.exports = {
    isLoggedIn,
    isQuestionMaster,
    isAdmin,
};
