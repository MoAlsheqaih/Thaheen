// This is a modal that allows the QM to edit a question.
// It will take in the question object and onClose method to change the visibility of the modal.
// It should be similar to the design of other modals.
// The form has a field (textbox-like) for the question text.
// There are 4 options, each with a textbox-like input field and a checkbox. The correct option should be checked by default.
// There is a field for the explanation of the question.
// There is a button to save the changes.

import { useParams } from "react-router-dom";
import { useState } from "react";

function QMEditModal({ question, onClose, onSave }) {
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEditedQuestion({ ...editedQuestion, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const handleCorrectOptionChange = (index) => {
    setEditedQuestion({ ...editedQuestion, correctOptionId: editedQuestion.options[index].id });
  };

  const { courseId, chapterId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseId}/chapters/${chapterId}/questions/${editedQuestion._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          text: editedQuestion.text,
          options: editedQuestion.options.map(option => option.text),
          correctOption: editedQuestion.options.find(option => option.id === editedQuestion.correctOptionId).text,
          explanation: editedQuestion.explanation,
          difficulty: editedQuestion.difficulty,
          type: editedQuestion.type
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update question");
      }

      const updatedQuestion = await response.json();
      onSave(updatedQuestion);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] rounded-[32px] px-8 py-10 shadow-2xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#FD7B06] mb-2">Edit Question</h2>
        <p className="text-sm text-[#006F6A] mb-6">
          Edit the question details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <textarea
              name="text"
              value={editedQuestion.text}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
              required
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={editedQuestion.options[index].text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={editedQuestion.correctOptionId === editedQuestion.options[index].id}
                    onChange={() => handleCorrectOptionChange(index)}
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
              name="explanation"
              value={editedQuestion.explanation}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#006F6A] text-white rounded-lg py-3 font-semibold hover:bg-[#006f6a]/90 transition-colors mt-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default QMEditModal;
