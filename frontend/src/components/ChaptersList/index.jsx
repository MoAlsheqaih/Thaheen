import { useState } from "react";

import AddChapterModal from "../Modals/AddChapterModal";
import ChapterCard from "./ChapterCard";

function ChaptersList(props) {
  const [chapters, setChapters] = useState(props.course.chapters);
  const [showAddChapter, setShowAddChapter] = useState(false);

  const handleDeleteChapter = async (chapterId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${props.course.id}/chapters/${chapterId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      if (response.ok) {
        setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleAddChapter = async (chapterName) => {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${props.course.id}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ name: chapterName })
      });

      if (response.ok) {
        const updatedCourse = await response.json();
        setChapters(updatedCourse.chapters);
        setShowAddChapter(false);
      }
    } catch (error) {
      console.error("Error adding chapter:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} courseId={props.course.id} isEditing={props.isEditing} onDelete={handleDeleteChapter} />
        ))}

        {props.isEditing && (
          <button className="border border-[#006F6A] dark:border-[#FD7B06] text-[#006F6A] dark:text-[#FD7B06] p-4 rounded-lg transition-shadow hover:shadow-lg cursor-pointer flex items-center justify-center" onClick={() => setShowAddChapter(true)}>
            <div className="w-16 h-16 rounded-full border border-[#006F6A] dark:border-[#FD7B06] flex items-center justify-center">
              <span className="text-2xl font-bold text-[#006F6A] dark:text-[#FD7B06]">+</span>
            </div>
          </button>
        )}

        {showAddChapter && (
          <AddChapterModal
            courseId={props.course.id}
            onClose={() => setShowAddChapter(false)}
            onAddChapter={handleAddChapter}
          />
        )}
      </div>

      {chapters.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Chapters Available</h2>
          <p className="text-gray-500">There are currently no chapters available for this course.</p>
        </div>
      )}
    </>
  );
}

export default ChaptersList;
