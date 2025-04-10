import { useParams } from "react-router-dom";

import ChaptersList from "../components/ChaptersList";
import Header from "../components/Header";

// TODO: Replace with actual data source
import courses from "../courses.json";

function Course() {
  const { id } = useParams();

  const course = courses.find(course => course.id === parseInt(id));

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-8">
        <div>
          <h1 className="text-2xl font-bold text-[#FD7B06]">Explore <span className="text-[#006F6A]">{course.code}</span></h1>
          <p className="text-gray-500 mt-1">{course.name}</p>
        </div>
        <ChaptersList course={course} />
      </div>
    </>
  );
}

export default Course; 