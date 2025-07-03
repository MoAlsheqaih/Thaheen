import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";

import QMEditModal from "../Modals/QMEditModal";

import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const parseFormattedText = (text) => {
  const parts = [];

  // This will match code blocks, math equations, and inline math
  const regex = /(```[\s\S]*?```|\\\[.*?\\\]|\\\(.*?\\\))/g;
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
    }

    lastIndex = offset + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

function QMQuestionCard({ question: initialQuestion, showReported = false, onDelete }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate the solved percentage
  const correctOption = question.options.find(option => option.id === question.correctOptionId);
  const solvedPercentage = question.totalSubmissions > 0 ? ((correctOption.count / question.totalSubmissions) * 100).toFixed(1) : "0.0";

  // Calculate average rating
  const averageRating = question.totalRaters > 0
    ? (question.totalRatings / question.totalRaters).toFixed(1)
    : "0.0";

  const { courseId, chapterId } = useParams();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/courses/${courseId}/chapters/${chapterId}/questions/${question._id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete question");
      }

      if (onDelete) {
        onDelete(question._id);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="group bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${question.difficulty === "Easy" ? "bg-green-100 text-green-700" : question.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
          >
            {question.difficulty}
          </span>
          <span
            className={`text-xs uppercase font-semibold ${question.type === "AI" ? "text-[#006F6A]" : "text-[#FD7B06]"}`}
          >
            {question.type} Question
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-800 font-medium">{parseFormattedText(question.text)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 md:mb-0 md:h-0 md:group-hover:h-auto md:overflow-hidden md:opacity-0 md:group-hover:opacity-100 md:group-hover:mb-4 transition-all duration-300">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`p-3 rounded-xl border ${option.id === question.correctOptionId ? "border-green-500 bg-green-50 text-green-800" : "border-gray-300"}`}
            >
              <span className="font-bold mr-2">{option.id}.</span> {parseFormattedText(option.text)}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600">
              Solved: {solvedPercentage}% ({correctOption.count}/{question.totalSubmissions})
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Rating: {averageRating}/5.0 by {question.totalRaters} users
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setSelectedQuestion(question);
                setViewEditModal(true);
              }}
              className="p-2 text-sm font-medium text-[#006F6A] border border-[#006F6A] rounded-lg hover:bg-[#006F6A] hover:text-white transition-all"
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`p-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <FaTrash />
            </button>
          </div>
        </div>

        {/* If showReported is true, show the report message in red */}
        {showReported && question.reports?.length > 0 && (
          <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
            <h4 className="text-red-600 font-semibold mb-2">Reported Issues:</h4>
            <ul className="list-disc list-inside text-sm text-red-800">
              {question.reports.map((report, idx) => (
                <li key={idx}>
                  {report.message}
                  <span className="text-gray-400 text-xs ml-2">
                    ({new Date(report.date).toLocaleString()})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {viewEditModal && <QMEditModal question={selectedQuestion} onClose={() => setViewEditModal(false)} onSave={updatedQuestion => {
        setQuestion(updatedQuestion);
      }} />}
    </>
  );
}

export default QMQuestionCard;
