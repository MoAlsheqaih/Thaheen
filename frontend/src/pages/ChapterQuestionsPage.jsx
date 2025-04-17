import { useParams } from "react-router-dom";
import { useState } from "react";

import QuestionCard from "../components/QuestionsList/QuestionCard";
import QuestionsModal from "../components/Modals/QuestionsModal";
import Header from "../components/Header";
import course_questions from "../assets/course_questions.svg";
import course_old from "../assets/course_old.svg";

// TODO: Replace with actual data
import courseData from "../courses.json";

function ChapterQuestionsPage() {
  const { courseId, chapterId } = useParams();
  const course = courseData.find((c) => c.id === Number(courseId));
  const chapter = course?.chapters.find((ch) => ch.id === Number(chapterId));
  const questions = chapter?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  // Filter questions based on selected type
  const filteredQuestions = selectedType
    ? questions.filter(q => q.type === selectedType)
    : questions;

  // track selected answers and ratings per question
  const [userProgress, setUserProgress] = useState(
    questions.map(() => ({
      selectedAnswerId: null,
      userRating: 0,
      submitted: false
    }))
  );

  const updateUserProgress = (index, field, value) => {
    setUserProgress((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  const markSubmitted = (index) => {
    setUserProgress((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        submitted: true
      };
      return updated;
    });
  };

  const currentProgress = userProgress[currentIndex];
  const currentQuestion = filteredQuestions[currentIndex];

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-[#FD7B06]">{course?.code} {course?.name}</h1>
          <p className="text-md text-[#006F6A] mb-4">
            {course?.code} / {chapter?.name}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-black">
                {currentIndex + 1} of {filteredQuestions.length}
              </span>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-[2_0_0] justify-center gap-2">
              <button
                onClick={() => setSelectedType(selectedType === "AI" ? null : "AI")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedType === "AI" ? "bg-[#FD7B06] text-white" : "bg-[#FD7B06] bg-opacity-40 text-[#FD7B06]"}`}
              >
                <img src={course_questions} alt="AI Questions" className="w-4 h-4" />
                <span className="font-medium text-white">AI <span className="hidden md:inline">Question</span></span>
              </button>
              <button
                onClick={() => setSelectedType(selectedType === "Old Exams" ? null : "Old Exams")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedType === "Old Exams" ? "bg-[#FD7B06] text-white" : "bg-[#FD7B06] bg-opacity-40 text-[#FD7B06]"}`}
              >
                <img src={course_old} alt="Old Exams" className="w-4 h-4" />
                <span className="font-medium text-white">Old <span className="hidden md:inline">Exam</span></span>
              </button>
            </div>

            <div className="flex-1 flex justify-end">
              <button
                className="text-sm font-medium text-[#FD7B06] border border-[#FD7B06] px-3 py-1 rounded-full"
                onClick={() => setShowAllModal(true)}
              >
                BROWSE
              </button>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-full bg-[#FD7B06] rounded-full transition-all"
              style={{ width: `${(userProgress.filter((q) => q.submitted).length / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedAnswerId={currentProgress.selectedAnswerId}
          userRating={currentProgress.userRating}
          submitted={currentProgress.submitted}
          onSelectAnswer={(answerId) =>
            updateUserProgress(currentIndex, "selectedAnswerId", answerId)
          }
          onRate={(rating) =>
            updateUserProgress(currentIndex, "userRating", rating)
          }
          onSubmit={() => markSubmitted(currentIndex)}
        />

        <div className="flex justify-between mt-8">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className={`px-4 py-2 rounded ${currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#006F6A] text-white"}`}
          >
            Previous
          </button>

          <button
            disabled={currentIndex === filteredQuestions.length - 1}
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className={`px-4 py-2 rounded ${currentIndex === filteredQuestions.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#006F6A] text-white"}`}
          >
            Next
          </button>
        </div>

        {showAllModal && (
          <QuestionsModal
            questions={filteredQuestions}
            currentIndex={currentIndex}
            onSelect={(index) => {
              setCurrentIndex(index);
              setShowAllModal(false);
            }}
            answeredStatus={userProgress.map((q) => q.submitted)}
            onClose={() => setShowAllModal(false)}
          />
        )}
      </div >
    </>
  );
}

export default ChapterQuestionsPage;
