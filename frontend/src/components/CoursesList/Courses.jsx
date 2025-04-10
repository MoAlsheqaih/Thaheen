import { useState } from "react";
import CourseCard from "./CourseCard";

function Courses({ search }) {
  const [showAll, setShowAll] = useState(false);

  // Example courses data - replace with your actual data source
  const courses = [
    {
      code: "SWE 206",
      name: "Introduction to SWE",
      questionsCount: 39,
      oldExamsCount: 0
    },
    {
      code: "ICS 321",
      name: "Database Systems",
      questionsCount: 45,
      oldExamsCount: 2
    },
    {
      code: "ICS 343",
      name: "Fundamentals of Computer Networks",
      questionsCount: 28,
      oldExamsCount: 1
    }, {
      code: "BUS 200",
      name: "Introduction to Business",
      questionsCount: 10,
      oldExamsCount: 0
    }, {
      code: "IAS 111",
      name: "Introduction to IAS",
      questionsCount: 10,
      oldExamsCount: 0
    },
    {
      code: "SWE 206",
      name: "Introduction to SWE",
      questionsCount: 39,
      oldExamsCount: 0
    },
    {
      code: "ICS 321",
      name: "Database Systems",
      questionsCount: 45,
      oldExamsCount: 2
    },
    {
      code: "ICS 343",
      name: "Fundamentals of Computer Networks",
      questionsCount: 28,
      oldExamsCount: 1
    }, {
      code: "BUS 200",
      name: "Introduction to Business",
      questionsCount: 10,
      oldExamsCount: 0
    }, {
      code: "IAS 111",
      name: "Introduction to IAS",
      questionsCount: 10,
      oldExamsCount: 0
    }
  ];

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(search.toLowerCase()) ||
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // Determine courses to display based on showAll state
  const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 9);

  if (filteredCourses.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <p className="text-gray-500 text-lg">No results found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {displayedCourses.map((course, index) => (
          <CourseCard
            key={index}
            code={course.code}
            name={course.name}
            questionsCount={course.questionsCount}
            oldExamsCount={course.oldExamsCount}
          />
        ))}
      </div>

      {filteredCourses.length > 9 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 text-[#FD7B06] border-2 border-[#FD7B06] rounded-full hover:bg-[#FD7B06] hover:text-white transition-colors"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default Courses;