import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { FaStar, FaFlag } from "react-icons/fa";
import { useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const parseFormattedText = (text) => {
  const parts = [];

  // This will match code blocks, math equations, inline math, and images
  const regex = /(```[\s\S]*?```|\\\[.*?\\\]|\\\(.*?\\\)|!\[.*?\]\(.*?\))/g;
  let lastIndex = 0;

  const matches = [...text.matchAll(regex)];

  for (const match of matches) {
    const [fullMatch] = match;
    const offset = match.index ?? 0;

    // Push plain text before match
    if (lastIndex < offset) {
      parts.push(text.slice(lastIndex, offset));
    }

    if (fullMatch.startsWith("```")) {
      const lines = fullMatch.split("\n");
      const firstLine = lines[0]; // ```lang (optional)
      const language = firstLine.slice(3).trim() || "text";
      const code = lines.slice(1, -1).join("\n"); // remove ``` and last ```
      parts.push(
        <SyntaxHighlighter
          key={offset}
          language={language}
          style={materialLight}
          customStyle={{ borderRadius: "0.5rem", margin: "0.5em 0", padding: "0.5em" }}
        >
          {code}
        </SyntaxHighlighter>
      );
    } else if (fullMatch.startsWith("\\[")) {
      const content = fullMatch.slice(2, -2);
      parts.push(<BlockMath key={offset}>{content}</BlockMath>);
    } else if (fullMatch.startsWith("\\(")) {
      const content = fullMatch.slice(2, -2);
      parts.push(<InlineMath key={offset}>{content}</InlineMath>);
    } else if (fullMatch.startsWith("![")) {
      const match = fullMatch.match(/!\[(.*?)\]\((.*?)\)/);

      if (match) {
        const alt = match[1];
        const src = match[2];
        parts.push(
          <img
            key={offset}
            src={src}
            alt={alt}
            style={{ maxWidth: "100%", margin: "1em 0", borderRadius: "0.5rem" }}
          />
        );
      }
    }


    lastIndex = offset + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

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
  progressPercentage,
  canSolve,
  courseId,
  chapterId,
}) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showReportField, setShowReportField] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleSelect = (optionId) => {
    if (!submitted && canSolve) {
      onSelectAnswer(optionId);
    }
  };

  const handleRate = (ratingValue) => {
    if (canSolve) {
      onRate(ratingValue);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswerId && !submitted && canSolve) {
      onSubmit();
    }
  };

  const handleBookmark = () => {
    if (canSolve) {
      onBookmark();
    }
  };

  const calculatePercentage = (count) => {
    if (question.totalSubmissions === 0) return "0%";
    const percent = (count / question.totalSubmissions) * 100;
    return `${Math.round(percent)}%`;
  };

  const averageRating = question.totalRaters
    ? (question.totalRatings / question.totalRaters).toFixed(2)
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
        <div
          className={`flex items-center gap-3 cursor-pointer text-2xl ${!canSolve && "opacity-50"}`}
        >
          {bookmarked ? (
            <IoBookmark
              className="fill-[#FD7B06] text-[#FD7B06]"
              onClick={handleBookmark}
            />
          ) : (
            <IoBookmarkOutline
              className="text-[#FD7B06]"
              onClick={handleBookmark}
            />
          )}
          <FaFlag
            onClick={() => {
              if (!canSolve) return;
              setShowReportField((prev) => !prev);
            }}
            className={`text-lg text-red-500 ${canSolve ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
          />
        </div>
        <div className="flex gap-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${question.type === "AI"
              ? "bg-teal-100 text-teal-700"
              : "bg-orange-100 text-orange-700"}`}
          >
            {question.type}
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${question.difficulty === "Easy"
              ? "bg-green-100 text-green-700"
              : question.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"}`}
          >
            {question.difficulty}
          </span>
        </div>
      </div>
      {showReportField && (
        <div className="mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            placeholder="Describe the issue with this question..."
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
          <button
            onClick={async () => {
              try {
                const response = await fetch(
                  `${process.env.REACT_APP_API_URL}/api/courses/${courseId}/chapters/${chapterId}/questions/${question._id}/report`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      "x-auth-token": localStorage.getItem("token"),
                    },
                    body: JSON.stringify({ message: reportText }),
                  }
                );

                if (response.ok) {
                  setReportText("");
                  setShowReportField(false);
                  setReportSubmitted(true);
                  setTimeout(() => setReportSubmitted(false), 1500);
                } else {
                  console.error("Failed to send report");
                }
              } catch (error) {
                console.error("Error submitting report:", error);
              }
            }}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
          >
            Submit Report
          </button>
        </div>
      )}
      {reportSubmitted && (
        <div className="mt-2 text-green-600 text-sm font-medium">
          We received your message. Thank you!
        </div>
      )}

      {/* Question text */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-teal-800 text-wrap">
          {parseFormattedText(question.text)}
        </h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isCorrect = option.id === question.correctOptionId;
          const isSelected = option.id === selectedAnswerId;

          const baseStyle = "p-3 rounded-xl border text-sm font-semibold";
          let answerStyle = "border-gray-300 bg-white";
          let cursorStyle = canSolve
            ? "cursor-pointer hover:bg-gray-100"
            : "cursor-not-allowed";

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
              className={`${baseStyle} ${answerStyle} ${cursorStyle}`}
              onClick={() => handleSelect(option.id)}
            >
              <span className="font-bold mr-2">{option.id}.</span> {parseFormattedText(option.text)}
              {submitted && (
                <span className="float-right text-sm text-orange-600 font-medium">
                  {calculatePercentage(option.count)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Login prompt for non-logged-in users */}
      {!canSolve && !submitted && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg text-center">
          <p className="text-orange-700 font-medium">
            Please login to solve questions
          </p>
        </div>
      )}

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
                  className={`${canSolve ? "cursor-pointer" : "cursor-not-allowed"} ${star <= userRating ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="text-xs text-gray-500">
                ({averageRating} avg by {question.totalRaters} students)
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
      {!submitted && selectedAnswerId && canSolve && (
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
