import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import QMAddOldQuestionModal from "../components/Modals/QMAddOldQuestionModal";
import QMAddAIQuestionModal from "../components/Modals/QMAddAIQuestionModal";
import QuestionCard from "../components/QuestionsList/QuestionCard";
import QuestionsModal from "../components/Modals/QuestionsModal";
import course_questions from "../assets/course_questions.svg";
import QMQuestionCard from "../components/QMQuestionCard";
import course_old from "../assets/course_old.svg";
import qm_edit from "../assets/qm_edit.png";
import Header from "../components/Header";

// TODO: Replace with actual data
import courseData from "../courses.json";

function ChapterQuestionsPage() {
  // Editing-related state variables
  const [isEditing, setIsEditing] = useState(false);
  const [viewAddAIQuestionModal, setViewAddAIQuestionModal] = useState(false);
  const [viewAddOldExamQuestionModal, setViewAddOldExamQuestionModal] = useState(false);

  const { courseId, chapterId } = useParams();
  const course = courseData.find((c) => c.id === Number(courseId));
  const chapter = course?.chapters.find((ch) => ch.id === Number(chapterId));
  const questions = chapter?.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [sortType, setSortType] = useState("default");

  // Update filtered questions when type or sort changes
  useEffect(() => {
    let newFilteredQuestions = selectedType
      ? questions.filter(q => q.type === selectedType)
      : [...questions];

    // Apply sorting to the filtered questions
    if (sortType === "easy-hard") {
      newFilteredQuestions.sort((a, b) => {
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
    } else if (sortType === "hard-easy") {
      newFilteredQuestions.sort((a, b) => {
        const difficultyOrder = { Hard: 1, Medium: 2, Easy: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
    } else {
      newFilteredQuestions.sort((a, b) => a.id - b.id);
    }

    setFilteredQuestions(newFilteredQuestions);
    setCurrentIndex(0);
  }, [selectedType, sortType, questions]);

  // track selected answers and ratings per question using question IDs as keys
  const [userProgress, setUserProgress] = useState(
    Object.fromEntries(questions.map(q => [q.id, {
      selectedAnswerId: null,
      userRating: null,
      submitted: false,
      bookmarked: false
    }]))
  );

  const updateUserProgress = (questionId, field, value) => {
    setUserProgress((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    }));
  };

  const markSubmitted = (questionId) => {
    setUserProgress((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        submitted: true
      }
    }));
  };

  const currentQuestion = filteredQuestions[currentIndex];
  const currentProgress = userProgress[currentQuestion?.id];

  // Calculate total progress based on all questions
  const totalProgress = questions.length > 0
    ? (Object.values(userProgress).filter(q => q.submitted).length / questions.length) * 100
    : 0;

  // Get the current question's index in the full questions array
  const getCurrentFullIndex = () => {
    if (!selectedType) return currentIndex;
    const currentQuestion = filteredQuestions[currentIndex];
    return questions.findIndex(q => q.id === currentQuestion?.id);
  };

  // Get the filtered index from a full questions index
  const getFilteredIndex = (fullIndex) => {
    if (!selectedType) return fullIndex;
    const question = questions[fullIndex];
    return filteredQuestions.findIndex(q => q.id === question?.id);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link to={`/course/${courseId}`}>
              <h1 className="text-xl font-bold text-[#FD7B06]">{course?.code} {course?.name}</h1>
            </Link>

            <button className={`bg-[#006F6A] text-white p-1 rounded-md transition-all ${isEditing ? "bg-opacity-70" : ""}`} onClick={() => setIsEditing(!isEditing)}>
              <img src={qm_edit} alt="qm_edit" className="w-6 h-6" />
            </button>
          </div>

          <p className="text-md text-[#006F6A] mb-4">
            {course?.code} / {chapter?.name}
          </p>

          {!isEditing && (
            questions.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Questions Available</h2>
                <p className="text-gray-500">There are currently no questions available for this chapter.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="md:flex-1 flex justify-start">
                    <div className="relative">
                      <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="text-sm font-medium text-[#FD7B06] border border-[#FD7B06] px-3 py-2 rounded-lg transition-all appearance-none cursor-pointer pr-8"
                      >
                        <option value="default">Default</option>
                        <option value="easy-hard">Easy → Hard</option>
                        <option value="hard-easy">Hard → Easy</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#FD7B06]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Filter buttons */}
                  <div className="flex md:flex-[2_0_0] justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedType(selectedType === "AI" ? null : "AI");
                        setCurrentIndex(0);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedType === "AI" ? "bg-[#FD7B06] text-white" : "bg-[#FD7B06] bg-opacity-40 text-[#FD7B06]"}`}
                    >
                      <img src={course_questions} alt="AI Questions" className="w-4 h-4" />
                      <span className="font-medium text-white">AI <span className="hidden md:inline">Question</span></span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedType(selectedType === "Old Exams" ? null : "Old Exams");
                        setCurrentIndex(0);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedType === "Old Exams" ? "bg-[#FD7B06] text-white" : "bg-[#FD7B06] bg-opacity-40 text-[#FD7B06]"}`}
                    >
                      <img src={course_old} alt="Old Exams" className="w-4 h-4" />
                      <span className="font-medium text-white">Old <span className="hidden md:inline">Exam</span></span>
                    </button>
                  </div>

                  <div className="md:flex-1 flex justify-end">
                    <button
                      className="text-sm font-medium text-[#FD7B06] border border-[#FD7B06] px-4 py-2 rounded-lg hover:bg-[#FD7B06] hover:text-white transition-all"
                      onClick={() => setShowAllModal(true)}
                    >
                      ALL
                    </button>
                  </div>
                </div>

                <QuestionCard
                  question={currentQuestion}
                  selectedAnswerId={currentProgress?.selectedAnswerId}
                  userRating={currentProgress?.userRating}
                  submitted={currentProgress?.submitted}
                  bookmarked={currentProgress?.bookmarked}
                  onSelectAnswer={(answerId) =>
                    updateUserProgress(currentQuestion.id, "selectedAnswerId", answerId)
                  }
                  onRate={(rating) =>
                    updateUserProgress(currentQuestion.id, "userRating", rating)
                  }
                  onSubmit={() => markSubmitted(currentQuestion.id)}
                  onBookmark={() => updateUserProgress(currentQuestion.id, "bookmarked", !currentProgress?.bookmarked)}
                  progressText={`${currentIndex + 1} of ${filteredQuestions.length}`}
                  progressPercentage={totalProgress}
                />

                <div className="flex justify-between mt-8">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    className={`px-4 py-2 rounded-lg ${currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#FD7B06] hover:bg-[#FD7B06]/80 transition-all text-white"}`}
                  >
                    Previous
                  </button>

                  <button
                    disabled={currentIndex === filteredQuestions.length - 1}
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                    className={`px-4 py-2 rounded-lg ${currentIndex === filteredQuestions.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#FD7B06] hover:bg-[#FD7B06]/80 transition-all text-white"}`}
                  >
                    Next
                  </button>
                </div>

                {showAllModal && (
                  <QuestionsModal
                    questions={questions}
                    currentIndex={getCurrentFullIndex()}
                    onSelect={(fullIndex) => {
                      const filteredIndex = getFilteredIndex(fullIndex);
                      if (filteredIndex !== -1) {
                        setCurrentIndex(filteredIndex);
                        setShowAllModal(false);
                      } else {
                        // If selected question is not in filtered list, update filter
                        const selectedQuestion = questions[fullIndex];
                        setSelectedType(selectedQuestion.type);
                        setCurrentIndex(0); // Reset to first question of new filter
                        setShowAllModal(false);
                      }
                    }}
                    answeredStatus={questions.map(q => userProgress[q.id]?.submitted)}
                    bookmarkedStatus={questions.map(q => userProgress[q.id]?.bookmarked)}
                    onClose={() => setShowAllModal(false)}
                  />
                )}
              </>
            )
          )}

          {isEditing && (
            <div className="py-12">
              <h2 className="text-xl font-bold text-[#FD7B06] mb-4">Upload new question</h2>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm text-[#006F6A]">Add an AI-generated question</p>

                  <button
                    onClick={() => setViewAddAIQuestionModal(true)}
                    className="bg-white rounded-lg w-full border border-dashed border-[#FD7B06] px-4 py-2 flex justify-center items-center hover:bg-[#FD7B06]/10 hover:text-white transition-all"
                  >
                    <div className="w-16 h-16 rounded-full border opacity-40 border-[#FD7B06] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#FD7B06]">+</span>
                    </div>
                  </button>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm text-[#006F6A]">Add an old exam question</p>

                  <button
                    onClick={() => setViewAddOldExamQuestionModal(true)}
                    className="bg-white rounded-lg w-full border border-dashed border-[#FD7B06] px-4 py-2 flex justify-center items-center hover:bg-[#FD7B06]/10 hover:text-white transition-all"
                  >
                    <div className="w-16 h-16 rounded-full border opacity-40 border-[#FD7B06] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#FD7B06]">+</span>
                    </div>
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-bold text-[#FD7B06] mt-8">All questions</h2>

              <div className="flex flex-col gap-2">
                {questions.map((question) => (
                  <QMQuestionCard key={question.id} question={question} />
                ))}
              </div>

              <h2 className="text-xl font-bold text-[#FD7B06] mt-8">Reported questions</h2>
              {/* Filter questions by those who have a report field and then show the question card with the prop showReported={true} */}

              {questions.filter(q => q.report).map((question) => (
                <QMQuestionCard key={question.id} question={question} showReported={true} />
              ))}

              {viewAddAIQuestionModal && <QMAddAIQuestionModal onClose={() => setViewAddAIQuestionModal(false)} />}
              {viewAddOldExamQuestionModal && <QMAddOldQuestionModal onClose={() => setViewAddOldExamQuestionModal(false)} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChapterQuestionsPage;
