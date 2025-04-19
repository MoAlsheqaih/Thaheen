import activities from "../../assets/activities.svg";

function Activities() {
  return (
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center px-4 md:px-8 py-32">
        {/* Content */}
        <div className="w-full md:w-1/3 flex flex-col items-start">
          <h2 className="text-4xl font-bold text-[#FD7B06] mb-4">
            Activities
          </h2>
          <p className="text-gray-500 dark:text-slate-200 text-lg z-20 w-full">
            This feature is under development as it requires a back-end and a socket connection for live data transmission.
          </p>
        </div>
      </div>

      {/* Activity Card - Hidden on mobile */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-6 px-16 opacity-30 text-center">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">ACTIVITY</h3>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600 dark:text-gray-300">Time: 5 minutes</p>
            <p className="text-gray-600 dark:text-gray-300">Participants: 1/5</p>
          </div>
          <button className="w-full bg-[#FD7B06] text-white py-2 px-4 rounded-md hover:bg-[#E66E05] transition-colors">
            JOIN
          </button>
        </div>
      </div>

      {/* Fox tail positioned at the edge */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 opacity-10 z-10 md:opacity-100 md:z-0">
        <img
          src={activities}
          alt="Activities fox tail"
          className="w-48"
        />
      </div>
    </div>
  );
}

export default Activities; 