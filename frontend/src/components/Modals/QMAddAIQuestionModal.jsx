// Follow the design of QMEditModal.jsx but with a different form.
// Use the same form of the edit modal, but add a textarea with a button above to generate the question.
// Something like "Enter relevant information about the question/material" and "Generate question" button.
// When the generate question is clicked, it should generate a question and fill the form with the generated question.

import { useParams } from "react-router-dom";
import { useState } from "react";

function QMAddAIQuestionModal({ onClose }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [explanation, setExplanation] = useState("");
  const [relevantInfo, setRelevantInfo] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [error, setError] = useState("");

  const { courseId, chapterId } = useParams();

  const handleGenerateQuestion = () => {
    // TODO: Implement the logic to generate the question

    // For now, just fill the form with some dummy data
    setQuestion("What is the capital of France?");
    setOptions(["Paris", "London", "Rome", "Madrid"]);
    setCorrectOption("Paris");
    setExplanation("Paris is the capital of France.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}/chapters/${chapterId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ type: "AI", question, options, correctOption, explanation, difficulty })
      });

      if (response.ok) {
        const data = await response.json();
        onClose(data);
      } else {
        setError("Failed to save question");
      }
    } catch (error) {
      setError("Failed to save question");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#FFF3E6] rounded-[32px] px-4 sm:px-8 py-6 sm:py-10 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative sm:[&::-webkit-scrollbar]:hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-[#FD7B06] mb-2">Add AI Question</h2>
        <p className="text-sm text-[#006F6A] mb-4 sm:mb-6">
          Generate a new AI question by providing relevant information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerateQuestion}
            className="w-full bg-[#006F6A] text-white rounded-lg py-2.5 sm:py-3 font-semibold hover:bg-[#006f6a]/90 transition-colors"
          >
            Generate Question
          </button>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white border border-gray-200 text-sm"
              required
            />
          </div>

          {/* Options */}
          <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white border border-gray-200 text-sm"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <label className="flex items-center gap-1 sm:gap-2 text-sm text-gray-600 whitespace-nowrap">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOption === option}
                    onChange={() => setCorrectOption(option)}
                    required
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Explanation
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white border border-gray-200 text-sm"
              required
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white border border-gray-200 text-sm"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#FD7B06] text-white rounded-lg py-2.5 sm:py-3 font-semibold hover:bg-[#FD7B06]/90 transition-colors"
          >
            Save Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default QMAddAIQuestionModal;
