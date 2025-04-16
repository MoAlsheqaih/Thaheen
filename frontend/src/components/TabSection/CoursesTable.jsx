import { useState, useEffect, useRef } from "react";

import deleteIcon from "../../assets/delete-icon.png";
import searchIcon from "../../assets/search-icon.png";
import editIcon from "../../assets/edit-icon.png";

const initialCourses = [
  {
    id: 1,
    code: "ICS 321",
    name: "Database Design",
    questions: "20 AI questions",
    exams: "",
    isChecked: false,
  },
  {
    id: 2,
    code: "ICS 321",
    name: "Database Design",
    questions: "20 AI questions",
    exams: "30 Old exam",
    isChecked: false,
  },
  {
    id: 3,
    code: "ICS 321",
    name: "Database Design",
    questions: "20 AI questions",
    exams: "30 Old exam",
    isChecked: false,
  },
  {
    id: 4,
    code: "ICS 321",
    name: "Database Design",
    questions: "20 AI questions",
    exams: "30 Old exam",
    isChecked: false,
  },
];

function CoursesTable() {
  const [courses, setCourses] = useState(initialCourses);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCheck = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isChecked: !c.isChecked } : c))
    );
  };

  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    setMenuOpenId(null);
  };

  const handleBulkDelete = () => {
    setCourses((prev) => prev.filter((c) => !c.isChecked));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      code: newCode,
      name: newName,
      questions: "",
      exams: "",
      isChecked: false,
    };
    setCourses((prev) => [...prev, newCourse]);
    setNewCode("");
    setNewName("");
    setShowModal(false);
  };

  const anySelected = courses.some((c) => c.isChecked);
  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase())
  );
  const visibleCourses = showAll ? filteredCourses : filteredCourses.slice(0, 3);

  return (
    <div className="bg-[#FFF7EC] rounded-xl p-4 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <button
          onClick={handleBulkDelete}
          className={`font-medium flex items-center gap-2 ${anySelected ? "text-red-500" : "text-gray-400 cursor-default"}`}
          disabled={!anySelected}
        >
          🗑 Delete all selected
        </button>

        <div className="flex items-center gap-2 bg-[#FFF3DF] px-3 py-1 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm px-1 text-gray-600"
          />
          <img src={searchIcon} alt="Search" className="w-4 h-4 text-orange-500" />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white py-1 px-4 rounded-full text-sm font-medium hover:bg-orange-600 transition"
        >
          + Add Course
        </button>
      </div>

      <div className="space-y-3 overflow-x-auto">
        {visibleCourses.map((course) => (
          <div
            key={course.id}
            className={`flex items-center justify-between p-3 rounded-xl shadow-sm border transition-all duration-200 ${course.isChecked ? "border-orange-400" : "border-transparent"} bg-white relative min-w-max w-full`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={course.isChecked}
                onChange={() => toggleCheck(course.id)}
                className="accent-orange-500 w-4 h-4"
              />
              <p className="font-medium w-20">{course.code}</p>
              <p className="font-bold text-[#1D1E25] w-64">{course.name}</p>
              <p className="text-sm text-gray-500 w-40">{course.questions}</p>
              <p className="text-sm text-gray-500 w-40">{course.exams}</p>
            </div>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpenId(course.id)}>
                <span className="text-xl text-orange-500">⋮</span>
              </button>

              {menuOpenId === course.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 z-10 w-28">
                  <button
                    onClick={() => alert("Edit logic to /QuestionMaster")}
                    className="flex items-center gap-2 text-teal-700 text-sm font-medium mb-1 hover:bg-teal-100 rounded px-2 py-1 transition"
                  >
                    <img src={editIcon} alt="edit" className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-100 rounded px-2 py-1 transition"
                  >
                    <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-orange-500 text-white text-sm font-medium py-1 px-6 rounded-full hover:bg-orange-600 transition"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-[#FFF7EC] rounded-2xl p-6 w-full max-w-md shadow-md">
            <h3 className="text-lg font-semibold text-orange-500 mb-4">New Course</h3>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <input
                type="text"
                placeholder="Course code such as ICS321"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Course name such as Database"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006D5B] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#005347] transition"
                >
                  ADD COURSE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesTable;