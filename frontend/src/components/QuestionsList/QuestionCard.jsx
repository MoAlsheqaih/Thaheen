import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

function QuestionCard({
  question,
  selectedAnswerId,
  userRating,
  submitted,
  bookmarked,
  onSelectAnswer,
  onRate,
  onSubmit,
  onBookmark,
  progressText,
  progressPercentage
}) {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (optionId) => {
    if (!submitted) {
      onSelectAnswer(optionId);
    }
  };

  const handleRate = (ratingValue) => {
    onRate(ratingValue);
  };

  const handleSubmit = () => {
    if (selectedAnswerId && !submitted) {
      onSubmit();
    }
  };

  const calculatePercentage = (count) => {
    if (question.totalSubmissions === 0) return "0%";
    const percent = (count / question.totalSubmissions) * 100;
    return `${Math.round(percent)}%`;
  };

  const averageRating = question.totalRaters
    ? ((question.totalRatings + (userRating ? userRating : 0)) / (question.totalRaters + (userRating ? 1 : 0))).toFixed(2)
    : "0.0";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-medium text-sm text-black">{progressText}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-[#FD7B06] rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Bookmark and Tags */}
      <div className="flex justify-between items-center mb-4">
        <div className="cursor-pointer text-2xl">
          {bookmarked ? (
            <IoBookmark className="fill-[#FD7B06] text-[#FD7B06]" onClick={onBookmark} />
          ) : (
            <IoBookmarkOutline className="text-[#FD7B06]" onClick={onBookmark} />
          )}
        </div>
        <div className="flex gap-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${question.type === "AI" ? "bg-teal-100 text-teal-700" : "bg-orange-100 text-orange-700"}`}
          >
            {question.type}
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${question.difficulty === "Easy" ? "bg-green-100 text-green-700" : question.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Question text */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-teal-800 text-wrap">{question.text}</h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isCorrect = option.id === question.correctOptionId;
          const isSelected = option.id === selectedAnswerId;

          const baseStyle = "p-3 rounded-xl border cursor-pointer text-sm font-semibold";
          let answerStyle = "border-gray-300 bg-white hover:bg-gray-100";

          if (submitted) {
            if (isSelected && isCorrect) {
              answerStyle = "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrect) {
              answerStyle = "border-red-500 bg-red-50 text-red-800";
            } else if (!isSelected && isCorrect) {
              answerStyle = "border-green-500 bg-green-50 text-green-800";
            } else {
              answerStyle = "opacity-60";
            }
          } else if (isSelected) {
            answerStyle = "border-blue-500 bg-blue-50 text-blue-800";
          }

          return (
            <div
              key={option.id}
              className={`${baseStyle} ${answerStyle}`}
              onClick={() => handleSelect(option.id)}
            >
              <span className="font-bold mr-2">{option.id}.</span> {option.text}
              {submitted && (
                <span className="float-right text-sm text-orange-600 font-medium">
                  {calculatePercentage(option.count)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Rating and Explanation */}
      {submitted && (
        <>
          <div className="mt-4 text-sm text-gray-600">
            <p className="mb-1">Your Rating:</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => handleRate(star)}
                  className={`cursor-pointer ${star <= userRating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="text-xs text-gray-500">
                ({averageRating} avg by {question.totalRaters + (userRating ? 1 : 0)} students)
              </span>
            </div>
          </div>

          <div className="mt-3 text-sm text-orange-600">
            <button onClick={() => setShowExplanation((prev) => !prev)}>
              {showExplanation ? "Hide explanation" : "Show explanation"}
            </button>
            {showExplanation && (
              <div className="mt-2 bg-orange-50 p-3 rounded-md text-gray-800">
                {question.explanation}
              </div>
            )}
          </div>
        </>
      )}

      {/* Submit button */}
      {!submitted && selectedAnswerId && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-[#FD7B06] hover:bg-[#FD7B06]/80 transition-all text-white px-4 py-2 rounded-lg font-medium"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
