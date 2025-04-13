import { Link } from "react-router-dom";

function ChapterCard(props) {
  // add the leading zero to the chapter number
  const chapterNumber = String(props.chapter.id).padStart(2, "0");

  return (
    <Link to={`/course/${props.courseId}/chapter/${props.chapter.id}`} className="bg-white rounded-lg border border-[#006F6A] p-4 transition-shadow hover:shadow-lg cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#006F6A]">{chapterNumber+"."} {props.chapter.name}</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Questions: {props.chapter.questionsCount}</p>
        </div>

        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="36"
              cx="48"
              cy="48"
            />
            <circle
              className="text-[#006F6A]"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="36"
              cx="48"
              cy="48"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - Math.random())}`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
            {`${Math.floor(Math.random() * 100)}%`}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChapterCard;
