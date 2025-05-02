const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  chapters: [chapterSchema]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
