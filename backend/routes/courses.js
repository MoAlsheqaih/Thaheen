const { Router } = require("express");

const Course = require("../models/courseSchema");
const { isAdmin } = require("../utils");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
});

router.post("/", async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { code, name } = req.body;

    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    // Calculate the id of the new course, which is the highest id + 1
    const lastCourse = await Course.findOne().sort({ id: -1 });
    const newId = lastCourse ? lastCourse.id + 1 : 1;

    const course = await Course.create({ id: newId, code, name });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.deleteOne({ id: req.params.id });
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
});

module.exports = router;
