import { useParams } from "react-router-dom";
import { useState } from "react";

function QMAddOldQuestionModal({ onClose }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [error, setError] = useState("");

  const { courseId, chapterId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/courses/${courseId}/chapters/${chapterId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ type: "Old Exams", question, options, correctOption, explanation, difficulty })
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
          onClick={() => onClose(null)}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-[#FD7B06] mb-2">Add Old Exam Question</h2>
        <p className="text-sm text-[#006F6A] mb-4 sm:mb-6">
          Add a question from previous exams.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
            className="w-full bg-[#FD7B06] text-white rounded-lg py-2.5 sm:py-3 font-semibold hover:bg-[#FD7B06]/90 transition-colors mt-2"
          >
            Save Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default QMAddOldQuestionModal;
