import { useParams } from "react-router-dom";
import { useState } from "react";

import AddChapter from "../components/Modals/AddChapter";
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
    <>
      <Header />
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-8">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#FD7B06]">Explore <span className="text-[#006F6A]">{course.code}</span></h1>

            <button className={`bg-[#006F6A] text-white p-1 rounded-md transition-all ${isEditing ? "bg-opacity-70" : ""}`} onClick={() => setIsEditing(!isEditing)}>
              <img src={qm_edit} alt="qm_edit" className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-500 mt-1">{course.name}</p>
        </div>

        <ChaptersList course={course} isEditing={isEditing} onAddChapter={() => setShowAddChapter(true)} />
        {showAddChapter && <AddChapter onClose={() => setShowAddChapter(false)} />}
      </div>
    </>
  );
}

export default Course; 