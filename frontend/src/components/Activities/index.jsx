import activities from "../../assets/activities.svg";

function Activities() {
  return (
    <div className="w-full relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center px-4 md:px-8 py-32">
        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <h2 className="text-4xl font-bold text-[#FD7B06] mb-4">
            Activities
          </h2>
          <p className="text-gray-500 text-lg">
            This feature is under development.
          </p>
        </div>
      </div>

      {/* Fox tail positioned at the edge */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 opacity-10 -z-30 md:opacity-100 md:z-0">
        <img
          src={activities}
          alt="Activities fox tail"
          className="w-48 h-48"
        />
      </div>
    </div>
  );
}

export default Activities; 