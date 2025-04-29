const { Router } = require("express");
const Course = require("../models/courseSchema");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

module.exports = router;
