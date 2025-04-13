import { useState } from "react";

function AddChapter(props) {
  const [chapterName, setChapterName] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] rounded-[32px] px-8 py-10 shadow-2xl max-w-sm w-full relative">
        <button
          onClick={props.onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition-all"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#FD7B06] mb-2">Add Chapter</h2>
        <p className="text-sm text-[#006F6A] mb-6">
          Add a new chapter to the course.
        </p>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter chapter name"
            className="w-full px-2 py-3 rounded-full bg-white border border-gray-200 text-sm"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
        </div>

        <button className="bg-[#006F6A] hover:bg-[#006f6a]/80 transition-all text-white rounded-full py-3 font-semibold w-full" onClick={(e) => {
          // TODO: Add chapter
          e.preventDefault();
          e.stopPropagation();
          alert("Adding chapter: " + chapterName);
          props.onClose();
        }}>
          ADD CHAPTER
        </button>
      </div>
    </div>
  );
}

export default AddChapter;

