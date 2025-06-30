// Follow the design of QMEditModal.jsx but with a different form.
// Use the same form of the edit modal, but add a textarea with a button above to generate the question.
// Something like "Enter relevant information about the question/material" and "Generate question" button.
// When the generate question is clicked, it should generate a question and fill the form with the generated question.

import { useParams } from "react-router-dom";
import { useState } from "react";

function QMAddAIQuestionModal({ onClose }) {
  // New states for multi-question support
  const [questions, setQuestions] = useState([]); // Array of question objects
  const [relevantInfo, setRelevantInfo] = useState("");
  const [slideStart, setSlideStart] = useState("");
  const [slideEnd, setSlideEnd] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const { courseId, chapterId } = useParams();

  // Validation helpers
  const isSlideRangeValid = () => {
    const start = Number(slideStart);
    const end = Number(slideEnd);
    return (
      !isNaN(start) &&
      !isNaN(end) &&
      start > 0 &&
      end >= start &&
      end - start <= 12 // 12 because I think the model won't handle more (بيصير مكلف اننا نختار مودل أحسن)
    );
  };

  const isNumQuestionsValid = () => {
    return Number(numQuestions) > 0 && Number(numQuestions) <= 10;
  };

  // Generate multiple questions
  const handleGenerateQuestions = async () => {
    setError("");
    if (!file && !relevantInfo.trim()) {
      setError("Please provide either a PDF file or relevant information.");
      return;
    }
    if (file && !isSlideRangeValid()) {
      setError("Slide range is invalid or exceeds 12.");
      return;
    }
    if (!isNumQuestionsValid()) {
      setError("Number of questions must be between 1 and 10.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("relevantInfo", relevantInfo);
      formData.append("slideStart", Number(slideStart));
      formData.append("slideEnd", Number(slideEnd));
      formData.append("numQuestions", Number(numQuestions));
      formData.append("pdfFile", file);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/generate/${courseId}/${chapterId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Expecting data.questions to be an array
        setQuestions(
          data.questions.map((q) => ({
            question: q.text,
            options: q.options,
            correctOption: q.correctOption,
            explanation: q.explanation,
            difficulty: q.difficulty,
          }))
        );
      } else {
        if (response.status === 400 || response.status === 413) {
          const data = await response.json();
          setError(data.error);
        } else {
          setError("Failed to generate questions");
        }
      }
    } catch (err) {
      setError("Failed to generate questions");
    }
    setIsLoading(false);
  };

  // Handle editing a question in the array
  const handleQuestionChange = (idx, field, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (field === "options") {
        updated[idx].options = value;
      } else {
        updated[idx][field] = value;
      }
      return updated;
    });
  };

  // Save all questions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!questions.length) {
      setError("No questions to save.");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/courses/${courseId}/chapters/${chapterId}/questions/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            questions: questions.map((q) => ({
              type: "AI",
              question: q.question,
              options: q.options,
              correctOption: q.correctOption,
              explanation: q.explanation,
              difficulty: q.difficulty,
            })),
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        onClose(data);
      } else {
        setError("Failed to save questions");
      }
    } catch (error) {
      setError("Failed to save questions");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#FFF3E6] rounded-[32px] px-4 sm:px-8 py-6 sm:py-10 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative sm:[&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => onClose(null)}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-[#FD7B06] mb-2">Add AI Questions</h2>
        <p className="text-sm text-[#006F6A] mb-4 sm:mb-6">
          Generate multiple AI questions by providing relevant information and slide range.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" encType="multipart/form-data">
          {/* Relevant Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relevant Information
            </label>
            <textarea
              value={relevantInfo}
              onChange={(e) => setRelevantInfo(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white border border-gray-200 text-sm"
              placeholder="Enter relevant information about the question/material..."
            />
          </div>

          {/* PDF File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
            <input
              type="file"
              name="pdfFile"
              accept=".pdf"
              className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
              onChange={e => setFile(e.target.files[0] || null)}
            />
          </div>

          {/* Slide Range and Number of Questions */}
          <div className="flex gap-2 sm:gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Slide Start</label>
              <input
                type="number"
                min={1}
                value={slideStart}
                onChange={(e) => setSlideStart(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                required
                disabled={!file}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Slide End</label>
              <input
                type="number"
                min={1}
                value={slideEnd}
                onChange={(e) => setSlideEnd(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                required
                disabled={!file}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1"># Questions</label>
              <input
                type="number"
                min={1}
                max={10}
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                required
              />
            </div>
          </div>
          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerateQuestions}
            className="w-full bg-[#006F6A] text-white rounded-lg py-2.5 sm:py-3 font-semibold hover:bg-[#006f6a]/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Generating (this may take a while)..." : "Generate Questions"}
          </button>
          {/* Render generated questions */}
          {questions.length > 0 && (
            <div className="space-y-6 mt-4">
              {questions.map((q, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-3 bg-white">
                  <div className="mb-2 text-sm font-semibold text-[#FD7B06]">Question {idx + 1}</div>
                  {/* Question Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                      required
                    />
                  </div>
                  {/* Options */}
                  <div className="space-y-2 mt-2">
                    <label className="block text-sm font-medium text-gray-700">Options</label>
                    {q.options.map((option, oidx) => (
                      <div key={oidx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...q.options];
                            newOptions[oidx] = e.target.value;
                            handleQuestionChange(idx, "options", newOptions);
                          }}
                          className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                          placeholder={`Option ${oidx + 1}`}
                          required
                        />
                        <label className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap">
                          <input
                            type="radio"
                            name={`correctOption-${idx}`}
                            checked={q.correctOption === option}
                            onChange={() => handleQuestionChange(idx, "correctOption", option)}
                            required
                          />
                          Correct
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* Explanation */}
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                    <textarea
                      value={q.explanation}
                      onChange={(e) => handleQuestionChange(idx, "explanation", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                      required
                    />
                  </div>
                  {/* Difficulty */}
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      value={q.difficulty}
                      onChange={(e) => handleQuestionChange(idx, "difficulty", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-sm"
                      required
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#FD7B06] text-white rounded-lg py-2.5 sm:py-3 font-semibold hover:bg-[#FD7B06]/90 transition-colors"
            disabled={isLoading || !questions.length}
          >
            Save Questions
          </button>
        </form>
      </div>
    </div>
  );
}

export default QMAddAIQuestionModal;

