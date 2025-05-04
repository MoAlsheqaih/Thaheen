const { pdf } = require("pdf-to-img");
const { Router } = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const { isQuestionMaster, isAdmin } = require("../utils");
const Course = require("../models/courseSchema");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

async function extractSlidesAsImages(pdfFilePath, slideStart, slideEnd) {
  const document = await pdf(pdfFilePath);

  if (document.length < slideEnd) {
    throw new RangeError("Slide end is greater than the number of slides in the PDF");
  }

  const images = [];

  for await (const image of document) {
    images.push(image);
  }

  fs.unlinkSync(pdfFilePath); // Clean up uploaded file (بحيث ماياخذ مساحة)
  return images.slice(slideStart - 1, slideEnd);
}

// Placeholder utility for generating questions with GPT-4o in a single call
async function generateQuestionsWithGPT4O({ relevantInfo, slideImages, course, chapter, numQuestions }) {
  // Compose the system and user prompt
  const systemPrompt = `You are a question generator. Given a course, chapter, relevant information, and slide images, generate an array of ${numQuestions} JSON objects, each with:
{
  "text": "...",
  "options": ["...", "...", "...", "..."],
  "correctOption": "...",
  "explanation": "...",
  "difficulty": "Easy" | "Medium" | "Hard"
}
Return only a valid JSON array. Do NOT include markdown formatting (no triple backticks or \`\`\`json), titles, or extra text.`;

  // Compose the user message
  let userPrompt = `Course: "${course.name}"
Chapter: "${chapter.name}"
Relevant Info: "${relevantInfo}"
`;
  if (slideImages && slideImages.length > 0) {
    userPrompt += `Slides: ${slideImages.length} images attached.`;
  } else {
    userPrompt += `Slides: None provided.`;
  }

  // Prepare the messages array
  const messages = [
    { role: "system", content: systemPrompt },
    {
      role: "user", content: [
        { type: "text", text: userPrompt },
        ...slideImages.map(image => ({
          type: "image_url",
          image_url: { url: `data:image/png;base64,${image.toString("base64")}` }
        }))
      ]
    },
  ];

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o",
      messages,
    },
    {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const data = response.data;
  const questions = JSON.parse(data.choices[0].message.content);
  return questions;
}

router.post("/:courseId/:chapterId", upload.single("pdfFile"), async (req, res) => {
  if (!isQuestionMaster(req) && !isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { courseId, chapterId } = req.params;
  const { relevantInfo, slideStart, slideEnd, numQuestions } = req.body;
  const pdfFilePath = req.file?.path;

  const course = await Course.findOne({ id: courseId });
  const chapter = course?.chapters.find(chapter => chapter.id === parseInt(chapterId));

  if (!course || !chapter) {
    if (pdfFilePath) fs.unlinkSync(pdfFilePath);
    return res.status(404).json({ message: "Course or chapter not found" });
  }

  try {
    // 1. Extract slide images from PPT
    let slideImages = [];
    if (pdfFilePath) {
      slideImages = await extractSlidesAsImages(pdfFilePath, slideStart, slideEnd);
    }

    // 2. Generate all questions in a single GPT-4o call
    const questions = await generateQuestionsWithGPT4O({
      relevantInfo,
      slideImages,
      course,
      chapter,
      numQuestions: Number(numQuestions || 1)
    });

    res.json({ questions });
  } catch (err) {
    if (pdfFilePath && fs.existsSync(pdfFilePath)) fs.unlinkSync(pdfFilePath);

    if (err instanceof RangeError) {
      return res.status(400).json({ error: "Slide end is greater than the number of slides in the PDF" });
    }

    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

module.exports = router;
