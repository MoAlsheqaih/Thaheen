import { useParams } from "react-router-dom";
import { useState } from "react";

import AddChapterModal from "../components/Modals/AddChapterModal";
import ChaptersList from "../components/ChaptersList";
import qm_edit from "../assets/qm_edit.png";
import Header from "../components/Header";

// TODO: Replace with actual data source
import courses from "../courses.json";
function Course() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddChapter, setShowAddChapter] = useState(false);

  const { id } = useParams();

  const course = courses.find(course => course.id === parseInt(id));

  return (
    <div className="bg-white dark:bg-[#2C2620] min-h-screen">
      <Header />
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-8">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#FD7B06] dark:text-[#006F6A]">Explore <span className="text-[#006F6A] dark:text-[#FD7B06]">{course.code}</span></h1>

            <button className={`bg-[#006F6A] dark:bg-[#F97008] text-white p-1 rounded-md transition-all ${isEditing ? "bg-opacity-70 dark:bg-opacity-70" : ""}`} onClick={() => setIsEditing(!isEditing)}>
              <img src={qm_edit} alt="qm_edit" className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-500 dark:text-slate-200 mt-1">{course.name}</p>
        </div>

        <ChaptersList course={course} isEditing={isEditing} onAddChapter={() => setShowAddChapter(true)} />
        {showAddChapter && <AddChapterModal onClose={() => setShowAddChapter(false)} />}
      </div>
    </div>
  );
}

export default Course; 