import { Link } from "react-router-dom";

import course_questions from "../../assets/course_questions.svg";
import course_old from "../../assets/course_old.svg";

function CourseCard({ id, code, name, questionsCount, oldExamsCount }) {
  return (
    <Link to={`/course/${id}`} className="bg-[#006F6A] rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow w-full flex flex-col">
      {/* Course code and name */}
      <div className="flex flex-col flex-grow mb-6">
        <h2 className="text-white text-2xl font-bold mb-1">{code}</h2>
        <p className="text-white text-lg">{name}</p>
      </div>

      {/* Stats and button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Questions count */}
          <div className="flex items-center gap-2">
            <img src={course_questions} alt="questions" className="w-6 h-6" />
            <span className="text-white text-xl">{questionsCount}</span>
          </div>

          {/* Old exams count */}
          <div className="flex items-center gap-2">
            <img src={course_old} alt="old exams" className="w-6 h-6" />
            <span className="text-white text-xl">{oldExamsCount}</span>
          </div>
        </div>

        {/* View Questions Button */}
        <button className="text-white hover:text-[#FD7B06] transition-colors flex items-center gap-1">
          <span>VIEW QUESTIONS</span>
          <span className="text-xl">&gt;</span>
        </button>
      </div>
    </Link>
  );
}

export default CourseCard; 