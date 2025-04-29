const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  text: { type: String, required: true },
  report: { type: String, default: "" },
  options: [{
    id: { type: String, required: true },
    text: { type: String, required: true },
    count: { type: Number, default: 0 }
  }],
  correctOptionId: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  type: { type: String, enum: ["AI", "Old Exams"], required: true },
  totalSubmissions: { type: Number, default: 0 },
  totalRaters: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  explanation: { type: String, default: "" }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
