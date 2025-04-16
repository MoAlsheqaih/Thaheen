import { useState, useEffect, useRef } from "react";

import deleteIcon from "../../assets/delete-icon.png";
import searchIcon from "../../assets/search-icon.png";
import sheqaihImg from "../../assets/Sheqaih.png";
import ammarImg from "../../assets/Ammar.png";
import usamaImg from "../../assets/Usama.png";
import saraImg from "../../assets/Sara.png";

const initialStudents = [
  {
    id: 1,
    name: "Sara",
    email: "Ammar.mail.com",
    avatar: saraImg,
    role: "Question Master",
    isChecked: false,
    products: "",
  },
  {
    id: 2,
    name: "Ammar",
    email: "a.mail@com",
    avatar: ammarImg,
    role: "Regular Student",
    isChecked: false,
    products: "95 Products",
  },
  {
    id: 3,
    name: "Usama",
    email: "aliJajami@mcq.com",
    avatar: usamaImg,
    role: "Regular Student",
    isChecked: false,
    products: "120 Products",
  },
  {
    id: 4,
    name: "Sheqaih",
    email: "thaheen/ah",
    avatar: sheqaihImg,
    role: "Question Master",
    isChecked: false,
    products: "120 Products",
  },
];

function StudentsTable() {
  const [students, setStudents] = useState(initialStudents);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
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
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isChecked: !s.isChecked } : s))
    );
  };

  const toggleRole = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
            ...s,
            role:
              s.role === "Regular Student" ? "Question Master" : "Regular Student",
          }
          : s
      )
    );
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setMenuOpenId(null);
  };

  const handleBulkDelete = () => {
    setStudents((prev) => prev.filter((s) => !s.isChecked));
  };

  const filteredStudents = students.filter((s) =>
    `${s.name} ${s.email} ${s.products} ${s.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const visibleStudents = filteredStudents.slice(0, visibleCount);
  const anySelected = students.some((s) => s.isChecked);

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
        <div className="bg-[#FFF3DF] flex items-center px-3 py-1 rounded-full">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm px-1 text-gray-600"
          />
          <img src={searchIcon} alt="Search" className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-3 overflow-x-auto">
        {visibleStudents.map((student) => (
          <div
            key={student.id}
            className={`flex items-center justify-between p-3 rounded-xl shadow-sm border transition-all duration-200 ${student.isChecked ? "border-orange-400" : "border-transparent"} bg-white relative min-w-max w-full`}
          >
            <div className="flex items-center gap-3 w-64">
              <input
                type="checkbox"
                checked={student.isChecked}
                onChange={() => toggleCheck(student.id)}
                className="accent-orange-500 w-4 h-4"
              />
              <img
                src={student.avatar}
                alt={student.name}
                className="w-9 h-9 rounded-full"
              />
              <div className="text-sm">
                <p className="font-semibold">{student.name}</p>
                <p className="text-gray-500 text-sm">{student.email}</p>
              </div>
            </div>

            <div className="text-sm text-gray-500 w-40 text-center font-normal">
              {student.products}
            </div>

            <div className="w-64 flex justify-center">
              <div className="flex bg-orange-100 rounded-full p-1 w-[200px] justify-between">
                <button
                  onClick={() => toggleRole(student.id)}
                  className={`w-1/2 text-sm font-medium py-1 rounded-full transition-all duration-300 ${student.role === "Question Master" ? "bg-orange-500 text-white" : "text-orange-500"}`}
                >
                  Question Master
                </button>
                <button
                  onClick={() => toggleRole(student.id)}
                  className={`w-1/2 text-sm font-medium py-1 rounded-full transition-all duration-300 ${student.role === "Regular Student" ? "bg-orange-500 text-white" : "text-orange-500"}`}
                >
                  Regular Student
                </button>
              </div>
            </div>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpenId(student.id)}>
                <span className="text-xl text-orange-500">⋮</span>
              </button>

              {menuOpenId === student.id && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 z-10 w-28">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="flex items-center gap-2 text-red-500 hover:underline text-sm"
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

      {filteredStudents.length > 3 && (
        <div className="text-center mt-4">
          {visibleCount < filteredStudents.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="bg-orange-500 text-white text-sm font-medium py-1 px-4 rounded-full hover:bg-orange-600 transition"
            >
              Show more
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(3)}
              className="bg-orange-500 text-white text-sm font-medium py-1 px-4 rounded-full hover:bg-orange-600 transition"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
