import { useState } from "react";

import searchIcon from "../../assets/search.svg";
import Courses from "./Courses";

function CoursesList() {
  const [search, setSearch] = useState("");

  return (
    <div className="max-w-7xl mx-auto w-full flex items-center justify-center flex-col gap-7 py-10 px-5">
      <h1 className="text-2xl md:text-4xl font-bold text-[#FD7B06] text-center">Explore the courses we cover!</h1>

      <div className="relative w-full max-w-2xl">
        {/* Fox mascot */}
        {/* <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <img src={happy_fox} alt="mascot" className="w-8 h-8" />
        </div> */}

        {/* Search input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for course"
          className="w-full pl-7 pr-14 py-3 bg-[#FFEAD6] text-slate-700 rounded-full outline-none placeholder:text-gray-500"
        />

        {/* Search icon */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#FD7B06] p-2 hover:bg-[#e56e05] transition-colors">
          <img src={searchIcon} alt="search" className="w-5 h-5" />
        </div>
      </div>

      <Courses search={search} />
    </div>
  );
}

export default CoursesList; 