import { useState, useEffect } from "react";

import deleteIcon from "../../assets/delete-icon.png";
import searchIcon from "../../assets/search-icon.png";
// import editIcon from "../../assets/edit-icon.png";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  // const [menuOpenId, setMenuOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [addError, setAddError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const menuRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/courses", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data.map(course => ({ ...course, isChecked: false })));
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setMenuOpenId(null);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const toggleCheck = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isChecked: !c.isChecked } : c))
    );
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      setCourses((prev) => prev.filter((c) => c.id !== id));
      // setMenuOpenId(null);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    const selectedCourses = courses.filter((c) => c.isChecked);
    const token = localStorage.getItem("token");
    const deletePromises = selectedCourses.map((course) =>
      fetch(`http://localhost:3001/api/courses/${course.id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      })
    );

    try {
      const responses = await Promise.all(deletePromises);
      const allSuccessful = responses.every((response) => response.ok);

      if (!allSuccessful) {
        throw new Error("Some courses failed to delete");
      }

      setCourses((prev) => prev.filter((c) => !c.isChecked));
    } catch (error) {
      console.error("Error deleting courses:", error);
      alert("Failed to delete some courses. Please try again.");
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setAddError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          code: newCode,
          name: newName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add course");
      }

      const newCourse = await response.json();
      setCourses((prev) => [...prev, newCourse]);
      setNewCode("");
      setNewName("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding course:", error);
      setAddError(error.message || "Failed to add course. Please try again.");
    }
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

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : (
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
                <p className="font-bold text-[#1D1E25] w-80 line-clamp-1">{course.name}</p>
                <p className="text-sm text-gray-500 w-32">{course.chapters.map(c => c.questions.filter(q => q.type === "AI").length).reduce((a, b) => a + b, 0) + course.chapters.map(c => c.questions.filter(q => q.type === "Old Exams").length).reduce((a, b) => a + b, 0)} Questions</p>
              </div>

              {/* Menu commented out */}
              {/* <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuOpenId(course.id)}>
                  <span className="text-xl text-orange-500">⋮</span>
                </button>

                {menuOpenId === course.id && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 z-50 w-28">
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-100 rounded px-2 py-1 transition"
                    >
                      <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div> */}

              {/* Direct delete button */}
              <button
                onClick={() => handleDelete(course.id)}
                className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-100 rounded px-2 py-1 transition"
              >
                <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

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
            {addError && (
              <div className="text-red-500 text-sm mb-4">{addError}</div>
            )}
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