import CourseCard from "./CourseCard";

function Courses({ search }) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {filteredCourses.map((course, index) => (
        <CourseCard
          key={index}
          code={course.code}
          name={course.name}
          questionsCount={course.questionsCount}
          oldExamsCount={course.oldExamsCount}
        />
      ))}
    </div>
  );
}

export default Courses;