import happy_fox from "../../assets/happy_fox.svg";
import questions from "../../assets/questions.svg";
import courses from "../../assets/courses.svg";
import users from "../../assets/users.svg";
import group from "../../assets/group.svg";
import Statistic from "./Statistic";
import Carousel from "./Carousel";

function Hero() {
  const slides = [
    <div className="w-full h-full flex items-center justify-center px-12 md:px-24">
      <div className="flex flex-col md:flex-row gap-4 w-1/2 md:w-full max-w-4xl">
        <div className="flex-1 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[70px]">
          <p className="text-sm md:text-lg text-[#006F6A] mb-1">Courses</p>
          <div className="flex items-center gap-2">
            <Statistic number={30} />
            <img src={courses} alt="courses" className="w-5 h-5 md:w-8 md:h-8 hidden md:block" />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[70px]">
          <p className="text-sm md:text-lg text-[#006F6A] mb-1">Questions</p>
          <div className="flex items-center gap-2">
            <Statistic number={1000} />
            <img src={questions} alt="questions" className="w-5 h-5 md:w-8 md:h-8 hidden md:block" />
          </div>
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center min-h-[70px]">
          <p className="text-sm md:text-lg text-[#006F6A] mb-1">Users</p>
          <div className="flex items-center gap-2">
            <Statistic number={500} />
            <img src={users} alt="users" className="w-5 h-5 md:w-8 md:h-8 hidden md:block" />
          </div>
        </div>
      </div>
    </div>,

    <div className="w-full h-full flex flex-col items-center justify-center px-12 md:px-24">
      <div className="flex items-center justify-center gap-2 flex-col-reverse md:flex-row">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center text-[#FD7B06]">Enjoy Studying!</h2>
        <img src={happy_fox} alt="happy_fox" className="w-10 h-10 md:w-14 md:h-14" />
      </div>
      <p className="text-lg md:text-xl text-[#006F6A] text-center">Thaheen is on a mission to make education exciting, effortless, and accessible to every student, everywhere!</p>
    </div>,

    <div className="w-full h-full flex items-center justify-center px-12 md:px-24 flex-col-reverse gap-2 md:gap-0 md:flex-row">
      <div className="flex flex-col items-center md:items-start justify-center md:flex-1">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#FD7B06] text-center md:text-left">Why Thaheen?</h2>
        <p className="text-lg md:text-xl text-[#006F6A] text-center md:text-justify">Access comprehensive study materials, practice tests, and track your progress all in one place.</p>
      </div>
      <div className="md:flex-1 flex justify-end">
        <img src={group} alt="group" className="w-16 h-16 md:w-64 md:h-64" />
      </div>
    </div>
  ];

  return (
    <div className="bg-[#FFEAD6] w-full flex justify-center items-center py-10">
      <div className="max-w-7xl w-full">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}

export default Hero; 