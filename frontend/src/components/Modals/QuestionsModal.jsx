import { IoBookmark } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

function QuestionsModal({ questions, currentIndex, onSelect, onClose, answeredStatus, bookmarkedStatus }) {
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < full || (i === full && half) ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative shadow-xl overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-6 text-center text-[#FD7B06]">
          All Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, idx) => {
            const avg =
              q.totalRaters > 0 ? (q.totalRatings / q.totalRaters).toFixed(1) : "0.0";
            return (
              <button
                key={q.id}
                onClick={() => onSelect(idx)}
                className={`text-left border p-4 rounded-lg transition-all relative ${idx === currentIndex ? "border-[#FD7B06] bg-orange-50" : "border-gray-200 hover:shadow-sm"}`}
              >
                <div className="absolute -top-1 left-1">
                  {bookmarkedStatus?.[idx] && <IoBookmark className="fill-[#FD7B06] text-[#FD7B06]" />}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-800 font-medium">
                    Q{idx + 1}: {q.text.length > 50 ? `${q.text.slice(0, 50)}...` : q.text}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${q.difficulty === "Easy" ? "bg-green-100 text-green-700" : q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                    >
                      {q.difficulty}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${answeredStatus?.[idx] ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
                    >
                      {answeredStatus?.[idx] ? "Answered" : "Unanswered"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs uppercase font-semibold ${q.type === "AI" ? "text-[#006F6A]" : "text-[#FD7B06]"}`}
                  >
                    {q.type} Question
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(avg)}
                    <span className="text-xs text-gray-500">({avg})</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionsModal;
