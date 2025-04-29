const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const coursesRoutes = require("./routes/coursesRoutes");

const app = express();
const PORT = 3000;
dotenv.config();

// Database
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/courses", coursesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
