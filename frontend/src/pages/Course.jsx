import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ChaptersList from "../components/ChaptersList";
import qm_edit from "../assets/qm_edit.png";
import Header from "../components/Header";

function Course() {
  const [isEditing, setIsEditing] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/courses/${id}`);
      const course = await response.json();

      if (response.ok) setCourse(course);
      else setCourse(-1);
    };

    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/status`, {
        headers: {
          "x-auth-token": token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      }
    };

    fetchCourse();
    fetchUserRole();
  }, [id]);

  // If the course is not found, redirect to the home page
  if (course === -1) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-white dark:bg-[#2C2620] min-h-screen">
      <Header />
      {course ? (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-8">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#FD7B06] dark:text-[#006F6A]">Explore <span className="text-[#006F6A] dark:text-[#FD7B06]">{course.code}</span></h1>

              {(userRole === "master" || userRole === "admin") && (
                <button className={`bg-[#006F6A] dark:bg-[#F97008] text-white p-1 rounded-md transition-all ${isEditing ? "bg-opacity-70 dark:bg-opacity-70" : ""}`} onClick={() => setIsEditing(!isEditing)}>
                  <img src={qm_edit} alt="qm_edit" className="w-6 h-6" />
                </button>
              )}
            </div>
            <p className="text-gray-500 dark:text-slate-200 mt-1">{course.name}</p>
          </div>

          <ChaptersList course={course} isEditing={isEditing} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-slate-200">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Course; 