// Grid of 4 cards per row (or 2 cards per row on mobile)
// Each card has a chapter name, questions count, and old exams count
// When clicked, it goes to the chapter page so /course/1/chapter/1
// Data is in the course JSON file
// Design is a card with a white background, border, rounded corners, and a hover effect
// That says 01 - Chapter Name for example
// Then below it says Questions: 10
// And shows a circle representing completion percentage, use a random number for now that is from 0 to questionsCount

import ChapterCard from "./ChapterCard";

function ChaptersList(props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {props.course.chapters.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} courseId={props.course.id} />
      ))}
    </div>
  );
}

export default ChaptersList;
