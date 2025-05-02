import { useState } from "react";

function AddChapterModal(props) {
  const [chapterName, setChapterName] = useState("");
  const [error, setError] = useState(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] dark:bg-[#2C2620] rounded-[32px] px-8 py-10 shadow-2xl max-w-sm w-full relative">
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 dark:text-slate-200 hover:text-gray-600 transition-all"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#FD7B06] mb-2">Add Chapter</h2>
        <p className="text-sm text-[#006F6A] dark:text-slate-200 mb-6">
          Add a new chapter to the course.
        </p>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter chapter name"
            className="w-full px-5 py-3 rounded-full bg-white border border-gray-200 text-sm dark:bg-[#2C2620] dark:border-[#FD7B06] dark:text-slate-200"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button className="bg-[#006F6A] dark:bg-[#F97008] hover:bg-[#006f6a]/80 dark:hover:bg-[#F97008]/80 transition-all text-white rounded-full py-3 font-semibold w-full" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!chapterName) {
            setError("Please enter a chapter name");
            return;
          }

          props.onAddChapter(chapterName);
        }}>
          ADD CHAPTER
        </button>
      </div>
    </div>
  );
}

export default AddChapterModal;

