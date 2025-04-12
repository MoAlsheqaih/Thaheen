import questions_solved from "../../assets/questions_solved.svg";
import user_icon from "../../assets/user_icon.svg";
import fox_tower from "../../assets/fox_tower.svg";
import points from "../../assets/points.svg";
import streak from "../../assets/streak.svg";

function WelcomeBack(props) {
  const { userData } = props;

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col px-4 md:px-8 py-10">
      <div className="flex items-center gap-12">
        <div className="flex flex-col gap-3 flex-grow">
          <h2 className="text-2xl font-bold mb-2 text-[#FD7B06]">Welcome Back, <span className="text-[#006F6A]">{userData.name}</span></h2>

          <div className="flex items-center bg-[#FFEAD6] rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#FD7B06] w-2 h-40"></div>

            <div className="flex items-center gap-8 px-6 w-full">
              <div className="flex items-center">
                <img src={user_icon} alt="User" className="w-28 h-28" />
              </div>

              <div className="flex flex-col md:flex-row justify-around w-full flex-grow">
                <div className="flex items-center gap-2">
                  <img src={points} alt="Points" className="w-10 h-10" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#006F6A] font-bold text-lg">{userData.points}</span>
                    <span className="text-[#006F6A] font-semibold text-lg">points</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img src={streak} alt="Streak" className="w-10 h-10" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#006F6A] font-bold text-lg">{userData.streak}</span>
                    <span className="text-[#006F6A] font-semibold text-lg">days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <img src={questions_solved} alt="Questions Solved" className="w-10 h-10" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#006F6A] font-bold text-lg">{userData.questionsSolved}</span>
                    <span className="text-[#006F6A] font-semibold text-lg">solved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <img src={fox_tower} alt="Fox with Tower" className="w-56 h-56" />
        </div>
      </div>
    </div>
  );
}

export default WelcomeBack;