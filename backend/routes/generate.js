const { pdf } = require("pdf-to-img");
const { Router } = require("express");
const multer = require("multer");
const axios = require("axios");
// const fs = require("fs");

const { isQuestionMaster, isAdmin } = require("../utils");
const Course = require("../models/courseSchema");

const router = Router();

const storage = multer.memoryStorage(); // Changed to memory storage to make this work on Heroku

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 100 } }); // 100MB limit

async function extractSlidesAsImages(pdfBuffer, slideStart, slideEnd) {
  const document = await pdf(pdfBuffer);

  if (document.length < slideEnd) {
    throw new RangeError("Slide end is greater than the number of slides in the PDF");
  }

  const images = [];

  for await (const image of document) {
    images.push(image);
  }

  // fs.unlinkSync(pdfFilePath); // Clean up uploaded file (بحيث ماياخذ مساحة)
  return images.slice(slideStart - 1, slideEnd);
}

// Placeholder utility for generating questions with GPT-4o in a single call
async function generateQuestionsWithAI({ relevantInfo, slideImages, course, chapter, numQuestions }) {
  // Compose the system and user prompt
  const systemPrompt = `You are a question generator. Given a course, chapter, relevant information, and slide images, generate an array of ${numQuestions} JSON objects, each with:
{
  "text": "...",
  "options": ["...", "...", "...", "..."],
  "correctOption": "...",
  "explanation": "...",
  "difficulty": "Easy" | "Medium" | "Hard"
}
Return only a valid JSON array. Do NOT use any non-mentioned formatting, titles, or extra text.

Code blocks:
\`\`\`<language>
<code>
\`\`\`

Inline LaTeX: \\( ... \\)
Block LaTeX:
\\ [ ... \\ ]`;

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
      model: "gpt-4.1-nano-2025-04-14",
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
  if (!(await isQuestionMaster(req)) && !(await isAdmin(req))) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { courseId, chapterId } = req.params;
  const { relevantInfo, slideStart, slideEnd, numQuestions } = req.body;
  const pdfBuffer = req.file?.buffer;

  const course = await Course.findOne({ id: courseId });
  const chapter = course?.chapters.find(chapter => chapter.id === parseInt(chapterId));

  if (!course || !chapter) {
    // if (pdfFilePath) fs.unlinkSync(pdfFilePath);
    return res.status(404).json({ message: "Course or chapter not found" });
  }

  try {
    // 1. Extract slide images from PPT
    let slideImages = [];
    if (pdfBuffer) {
      slideImages = await extractSlidesAsImages(pdfBuffer, slideStart, slideEnd);
    }

    // 2. Generate all questions in a single GPT-4o call
    const questions = await generateQuestionsWithAI({
      relevantInfo,
      slideImages,
      course,
      chapter,
      numQuestions: Number(numQuestions || 1)
    });

    res.json({ questions });
  } catch (err) {
    // if (pdfFilePath && fs.existsSync(pdfFilePath)) fs.unlinkSync(pdfFilePath);

    if (err instanceof RangeError) {
      return res.status(400).json({ error: "Slide end is greater than the number of slides in the PDF" });
    }

    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}, (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File size limit exceeded. Maximum: 100MB." });
  }

  next(err);
});

module.exports = router;
