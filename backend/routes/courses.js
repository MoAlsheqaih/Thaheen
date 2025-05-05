const { Router } = require("express");
const jwt = require("jsonwebtoken");

const { isQuestionMaster, isAdmin } = require("../utils");
const Question = require("../models/questionSchema");
const Course = require("../models/courseSchema");
const User = require("../models/userSchema");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().lean();

    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];

      for (let j = 0; j < course.chapters.length; j++) {
        const chapter = course.chapters[j];

        const questions = await Question.find({ _id: { $in: chapter.questionIds } }).lean();
        course.chapters[j].questions = questions;
      }
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id }).lean();

    for (let i = 0; i < course.chapters.length; i++) {
      const chapter = course.chapters[i];
      const questions = await Question.find({ _id: { $in: chapter.questionIds } }).lean();
      chapter.questions = questions;
    }

    // Check for JWT token in header
    const token = req.headers["x-auth-token"];
    let userProgress = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).lean();
        if (user && user.progress) {
          userProgress = user.progress;
        }
      } catch (err) {
        // Invalid token, ignore progress
      }
    }

    // If user progress is available, calculate solvedPercentage per chapter
    if (userProgress) {
      for (let i = 0; i < course.chapters.length; i++) {
        const chapter = course.chapters[i];
        const questionIds = chapter.questionIds.map(id => id.toString());
        let solvedCount = 0;
        let totalCount = questionIds.length;
        if (totalCount > 0) {
          for (const qid of questionIds) {
            const progress = userProgress[qid] || userProgress.get && userProgress.get(qid);
            if (progress && progress.submitted) {
              solvedCount++;
            }
          }
          chapter.solvedPercentage = Math.round((solvedCount / totalCount) * 100);
        } else {
          chapter.solvedPercentage = 0;
        }
      }
    }

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
    const lastCourse = (await Course.find().sort({ id: -1 }))[0];
    const newId = lastCourse ? lastCourse.id + 1 : 1;

    const course = await Course.create({ id: newId, code, name });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
});

// Add a chapter to a course
router.post("/:id/chapters", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const { name } = req.body;

    const lastChapter = course.chapters[course.chapters.length - 1];
    const newId = lastChapter ? lastChapter.id + 1 : 1;

    course.chapters.push({ id: newId, name });
    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error adding chapter to course", error: error.message });
  }
});

// Delete a chapter from a course
router.delete("/:id/chapters/:chapterId", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapter = course.chapters.find(chapter => chapter.id === parseInt(req.params.chapterId));
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    course.chapters = course.chapters.filter(chapter => chapter.id !== parseInt(req.params.chapterId));
    await course.save();

    res.json({ message: "Chapter deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chapter from course", error: error.message });
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

// Add a question to a chapter
router.post("/:id/chapters/:chapterId/questions", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapter = course.chapters.find(chapter => chapter.id === parseInt(req.params.chapterId));
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const { type, question, options, correctOption, explanation, difficulty } = req.body;

    // Get the last question id in the chapter
    const lastQuestion = await Question.findOne({ _id: { $in: chapter.questionIds } }).sort({ id: -1 });
    const newId = lastQuestion ? lastQuestion.id + 1 : 1;

    const newQuestion = await Question.create({
      id: newId,
      text: question,
      options: options.map((option, index) => ({
        id: ["A", "B", "C", "D"][index],
        text: option,
        count: 0
      })),
      correctOptionId: ["A", "B", "C", "D"][options.indexOf(correctOption)],
      explanation,
      difficulty,
      type
    });

    chapter.questionIds.push(newQuestion._id);
    await course.save();

    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error adding question to chapter", error: error.message });
  }
});

// Bulk add questions to a chapter
router.post("/:id/chapters/:chapterId/questions/bulk", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapter = course.chapters.find(chapter => chapter.id === parseInt(req.params.chapterId));
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const { questions } = req.body;

    // Get the last question id in the chapter
    const lastQuestion = await Question.findOne({ _id: { $in: chapter.questionIds } }).sort({ id: -1 });
    let nextId = lastQuestion ? lastQuestion.id + 1 : 1;

    const createdQuestions = [];
    for (const q of questions) {
      const { question, options, correctOption, explanation, difficulty, type } = q;
      const newQuestion = await Question.create({
        id: nextId++,
        text: question,
        options: options.map((option, index) => ({
          id: ["A", "B", "C", "D"][index],
          text: option,
          count: 0
        })),
        correctOptionId: ["A", "B", "C", "D"][options.indexOf(correctOption)],
        explanation,
        difficulty,
        type
      });
      chapter.questionIds.push(newQuestion._id);
      createdQuestions.push(newQuestion);
    }

    await course.save();
    res.json(createdQuestions);
  } catch (error) {
    res.status(500).json({ message: "Error adding questions to chapter", error: error.message });
  }
});

// Update a question
router.put("/:id/chapters/:chapterId/questions/:questionId", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapter = course.chapters.find(chapter => chapter.id === parseInt(req.params.chapterId));
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const { text, options, correctOption, explanation, difficulty, type } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.questionId,
      {
        text,
        options: options.map((option, index) => ({
          id: ["A", "B", "C", "D"][index],
          text: option,
          count: 0
        })),
        correctOptionId: ["A", "B", "C", "D"][options.indexOf(correctOption)],
        explanation,
        difficulty,
        type
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
});

// Delete a question from a chapter
router.delete("/:id/chapters/:chapterId/questions/:questionId", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const chapter = course.chapters.find(chapter => chapter.id === parseInt(req.params.chapterId));
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Remove the question ID from the chapter's questionIds array
    chapter.questionIds = chapter.questionIds.filter(id => id.toString() !== req.params.questionId);
    await course.save();

    // Delete the question from the questions collection
    await Question.findByIdAndDelete(req.params.questionId);

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
});

// Add a report to a specific question
router.put("/:id/chapters/:chapterId/questions/:questionId/report", async (req, res) => {
  try {
    const { message } = req.body;
    const { questionId } = req.params;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Report message is required" });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (!Array.isArray(question.reports)) {
      question.reports = [];
    }

    question.reports.push({
      message,
      date: new Date()
    });

    await question.save();

    res.status(200).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error reporting question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;