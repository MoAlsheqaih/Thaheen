const { Router } = require("express");
const axios = require("axios");

const { isQuestionMaster, isAdmin } = require("../utils");
const Course = require("../models/courseSchema");


const router = Router();

router.post("/:courseId/:chapterId", async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { courseId, chapterId } = req.params;
  const { relevantInfo } = req.body;

  const course = await Course.findOne({ id: courseId });
  const chapter = course.chapters.find(chapter => chapter.id === parseInt(chapterId));

  if (!course || !chapter) {
    return res.status(404).json({ message: "Course or chapter not found" });
  }

  const prompt = `
You are a question generator. Given a concept, return a JSON object with:
{
  "text": "...",
  "options": ["...", "...", "...", "..."],
  "correctOption": "...",
  "explanation": "...",
  "difficulty": "Easy" | "Medium" | "Hard"
}

Course: "${course.name}"
Chapter: "${chapter.name}"
Concept: "${relevantInfo}"
`;

  const response = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  }, {
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  const data = response.data;
  const question = data.choices[0].message.content;

  res.json({ question: JSON.parse(question) });
});

module.exports = router;
