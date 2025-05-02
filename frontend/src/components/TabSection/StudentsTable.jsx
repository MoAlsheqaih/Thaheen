import { useState, useEffect } from "react";

import deleteIcon from "../../assets/delete-icon.png";
import searchIcon from "../../assets/search-icon.png";

function StudentsTable() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/admin/users", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setStudents(data.map(student => ({ ...student, isChecked: false })));
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to load students. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const toggleCheck = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isChecked: !s.isChecked } : s))
    );
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    const selectedStudents = students.filter((s) => s.isChecked);
    const token = localStorage.getItem("token");
    const deletePromises = selectedStudents.map((student) =>
      fetch(`http://localhost:3001/api/admin/users/${student._id}`, {
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
        throw new Error("Some students failed to delete");
      }

      setStudents((prev) => prev.filter((s) => !s.isChecked));
    } catch (error) {
      console.error("Error deleting students:", error);
      alert("Failed to delete some students. Please try again.");
    }
  };

  const toggleRole = async (id) => {
    try {
      const student = students.find(s => s._id === id);
      const newRole = student.role === "regular" ? "master" : "regular";

      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setStudents((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, role: newRole } : s
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  };

  const anySelected = students.some((s) => s.isChecked);
  const filteredStudents = students.filter(
    (s) =>
      s.name.first.toLowerCase().includes(search.toLowerCase()) ||
      s.name.last.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );
  const visibleStudents = showAll ? filteredStudents : filteredStudents.slice(0, 3);

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
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="space-y-3 overflow-x-auto">
          {visibleStudents.map((student) => (
            <div
              key={student._id}
              className={`flex items-center justify-between p-3 rounded-xl shadow-sm border transition-all duration-200 ${student.isChecked ? "border-orange-400" : "border-transparent"} bg-white relative min-w-max w-full`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={student.isChecked}
                  onChange={() => toggleCheck(student._id)}
                  className="accent-orange-500 w-4 h-4"
                />
                <p className="font-medium w-40">{`${student.name.first} ${student.name.last}`}</p>
                <p className="text-sm text-gray-500 w-64">{student.email}</p>
                <p className="text-sm text-gray-500 w-32">{student.questionsSolved} Question(s)</p>
              </div>

              <div className="flex bg-orange-100 rounded-full p-1 w-[200px] justify-between">
                <button
                  onClick={() => toggleRole(student._id)}
                  className={`w-1/2 text-sm font-medium py-1 rounded-full transition-all duration-300 ${student.role === "master" ? "bg-orange-500 text-white" : "text-orange-500"}`}
                >
                  Question Master
                </button>
                <button
                  onClick={() => toggleRole(student._id)}
                  className={`w-1/2 text-sm font-medium py-1 rounded-full transition-all duration-300 ${student.role === "regular" ? "bg-orange-500 text-white" : "text-orange-500"}`}
                >
                  Regular Student
                </button>
              </div>

              <button
                onClick={() => handleDelete(student._id)}
                className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-100 rounded px-2 py-1 transition"
              >
                <img src={deleteIcon} alt="delete" className="w-4 h-4" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredStudents.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-orange-500 text-white text-sm font-medium py-1 px-6 rounded-full hover:bg-orange-600 transition"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentsTable;
