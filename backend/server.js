const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const leaderboardRoute = require("./routes/leaderboard");
const progressRoute = require("./routes/progress");
const generateRoute = require("./routes/generate");
const coursesRoute = require("./routes/courses");
const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");

const app = express();
const PORT = 3001;

// Database
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/progress", progressRoute);
app.use("/api/generate", generateRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
