import master from "../../assets/master.svg";

function QuestionMaster() {
  return (
    <div className="w-full bg-[#FFEAD6] flex justify-center py-16 relative">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center px-4 md:px-8 gap-8">
        {/* Left side with image */}
        <div className="w-full md:w-1/2 flex items-end justify-center relative">
          <img
            src={master}
            alt="Question Master Fox"
            className="w-64 h-64 relative md:absolute md:translate-y-[85%]"
          />
        </div>

        {/* Right side with content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            Want to be a Master?
          </h2>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <button className="w-full bg-[#FD7B06] text-white py-3 px-6 rounded-2xl font-semibold hover:bg-[#e56e05] transition-colors">
              REGISTER NOW
            </button>
            <button className="w-full bg-white text-[#FD7B06] py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
              I ALREADY HAVE AN ACCOUNT
            </button>
          </div>

          {/* What is link */}
          <button className="text-[#FD7B06] hover:text-[#e56e05] transition-colors mt-2 text-center font-bold underline">
            What is a Question Master?
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionMaster; 