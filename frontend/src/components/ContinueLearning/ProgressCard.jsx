import { Link } from "react-router-dom";

function ProgressCard(props) {
  const { courseProgress } = props;

  return (
    <Link to={`/course/${courseProgress.id}`}>
      <div className="flex flex-col gap-1 shadow-lg hover:shadow-xl transition-shadow rounded-xl p-4">
        <p className="text-xl font-medium">{courseProgress.code}</p>

        {/* Bar that shows the progress of the course */}
        <div className="w-full h-2 bg-gray-400 rounded-full">
          <div className="h-2 bg-[#FD7B06] rounded-full" style={{ width: `${courseProgress.progress}%` }}></div>
        </div>

        <p className="font-medium line-clamp-1">{courseProgress.name}</p>
        <p className="text-sm font-thin">{courseProgress.progress.toFixed(1)}% - {courseProgress.questionsCount - courseProgress.questionsSolved} questions remaining</p>
      </div>
    </Link>
  );
}

export default ProgressCard;
