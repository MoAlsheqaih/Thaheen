import { useState } from "react";
import ProgressCard from "./ProgressCard";

// TODO: Replace with actual data
import courses from "../../courses.json"

function ContinueLearning(props) {
  const { userData } = props;

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  // this will get the course progress for the user and add the course data to it
  const coursesProgress = userData.courseProgress.map((courseProgress) => {
    const course = courses.find((c) => c.id === courseProgress.id);

    return {
      ...course,
      ...courseProgress,
      progress: (courseProgress.questionsSolved / course.questionsCount) * 100
    }
  });

  const totalPages = Math.ceil(coursesProgress.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleCourses = coursesProgress.slice(startIndex, startIndex + cardsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex gap-3 flex-col px-4 md:px-8 py-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#FD7B06]">Continue Learning</h2>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            className="text-[#FD7B06] hover:text-[#e56e05] transition-colors text-2xl font-bold px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
            disabled={currentPage === 0}
          >
            &#8249;
          </button>

          <button
            onClick={nextPage}
            className="text-[#FD7B06] hover:text-[#e56e05] transition-colors text-2xl font-bold px-3 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
            disabled={currentPage === totalPages - 1}
          >
            &#8250;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {visibleCourses.map((courseProgress) => (
          <ProgressCard key={courseProgress.id} courseProgress={courseProgress} />
        ))}
      </div>
    </div>
  );
}

export default ContinueLearning;