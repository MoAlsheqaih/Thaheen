import { Link } from "react-router-dom";

import bin from "../../assets/bin.png";

function ChapterCard(props) {
  // add the leading zero to the chapter number
  const chapterNumber = String(props.chapter.id).padStart(2, "0");

  // Use solvedPercentage if available
  const solvedPercentage = typeof props.chapter.solvedPercentage === "number" ? props.chapter.solvedPercentage : null;
  const circleRadius = 36;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progress = solvedPercentage !== null ? solvedPercentage / 100 : 0;
  const strokeDashoffset = solvedPercentage !== null ? circleCircumference * (1 - progress) : circleCircumference;

  return (
    <Link to={`/course/${props.courseId}/chapter/${props.chapter.id}`} className="bg-white dark:bg-[#2C2620] rounded-lg border border-[#006F6A] dark:border-[#FD7B06] p-4 transition-shadow hover:shadow-lg cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#006F6A] dark:text-[#FD7B06]">{chapterNumber + "."} {props.chapter.name}</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-200 mt-1">Questions: {props.chapter.questionIds.length}</p>
        </div>

        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              className="text-gray-200 dark:text-slate-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="48"
              cy="48"
            />
            <circle
              className={solvedPercentage !== null ? "text-[#006F6A] dark:text-[#FD7B06]" : "text-gray-200 dark:text-slate-200"}
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="48"
              cy="48"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.5s" }}
            />
          </svg>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold dark:text-[#FD7B06]">
            {solvedPercentage !== null ? `${solvedPercentage}%` : "N/A"}
          </div>

          {props.isEditing && (
            <button className="absolute -top-[10px] -right-[10px]" onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onDelete(props.chapter.id);
            }}>
              <img src={bin} alt="bin" className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ChapterCard;
