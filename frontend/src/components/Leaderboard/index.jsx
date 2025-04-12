import fox_second from "../../assets/fox_second.svg";
import fox_first from "../../assets/fox_first.svg";
import fox_third from "../../assets/fox_third.svg";
import streak from "../../assets/streak.svg";
import medal from "../../assets/medal.svg";

function Leaderboard(props) {
  const { leaderboardData, userData } = props;

  const sortedLeaderboardData = leaderboardData.rows.sort((a, b) => b.points - a.points);
  const userPosition = sortedLeaderboardData.findIndex(user => user.id === userData.id) + 1;

  return (
    <div className="max-w-7xl mx-auto w-full flex gap-3 flex-col px-4 md:px-8 pt-16 pb-32">
      <div className="flex gap-3 items-center">
        <img src={medal} alt="Medal" className="w-10 h-10" />
        <h2 className="text-2xl font-bold text-[#FD7B06]">Leaderboard</h2>
      </div>

      {/* Top 3 users display */}
      <div className="relative h-48 md:h-64 flex items-end justify-center mb-8 bg-[#FFEAD6] rounded-xl p-4">
        {/* Second place */}
        <div className="absolute left-0 md:left-1/4 bottom-8 flex flex-col items-center w-1/3 md:w-auto">
          <img src={fox_second} alt="Second place" className="w-16 h-16 md:w-24 md:h-24" />
          <p className="font-medium text-sm md:text-base text-center">{sortedLeaderboardData[1]?.name}</p>
          <p className="text-xs md:text-sm text-gray-600">{sortedLeaderboardData[1]?.points} points</p>
        </div>

        {/* First place */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex flex-col items-center w-1/3 md:w-auto">
          <img src={fox_first} alt="First place" className="w-20 h-20 md:w-32 md:h-32" />
          <p className="font-medium text-sm md:text-base text-center">{sortedLeaderboardData[0]?.name}</p>
          <p className="text-xs md:text-sm text-gray-600">{sortedLeaderboardData[0]?.points} points</p>
        </div>

        {/* Third place */}
        <div className="absolute right-0 md:right-1/4 bottom-4 flex flex-col items-center w-1/3 md:w-auto">
          <img src={fox_third} alt="Third place" className="w-16 h-16 md:w-24 md:h-24" />
          <p className="font-medium text-sm md:text-base text-center">{sortedLeaderboardData[2]?.name}</p>
          <p className="text-xs md:text-sm text-gray-600">{sortedLeaderboardData[2]?.points} points</p>
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="px-4"></th>
              <th className="px-4">NAME</th>
              <th className="px-4">
                <div className="flex items-center gap-2">
                  <img src={streak} alt="Streak" className="w-5 h-5" />
                  STREAK
                </div>
              </th>
              <th className="px-4">SOLVED</th>
              <th className="px-4">POINTS</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboardData
              .slice(Math.max(0, userPosition - 3), userPosition - 1)
              .map((user, index) => (
                <tr key={user.id} className="bg-[#FFF5EB] rounded-xl">
                  <td className="py-2 px-4 text-[#FD7B06] font-medium rounded-l-xl text-xl">{userPosition - 2 + index}</td>
                  <td className="py-2 px-4 font-medium">{user.name}</td>
                  <td className="py-2 px-4 text-[#FD7B06]">{user.streak}</td>
                  <td className="py-2 px-4 text-[#FD7B06]">{user.questionsSolved}</td>
                  <td className="py-2 px-4 text-[#FD7B06] rounded-r-xl">{user.points}</td>
                </tr>
              ))}
            <tr className="bg-[#FD7B06] text-white rounded-xl">
              <td className="py-2 px-4 font-medium rounded-l-xl text-xl">{userPosition}</td>
              <td className="py-2 px-4 font-medium">{userData.name}</td>
              <td className="py-2 px-4">{userData.streak}</td>
              <td className="py-2 px-4">{userData.questionsSolved}</td>
              <td className="py-2 px-4 rounded-r-xl">{userData.points}</td>
            </tr>
            {sortedLeaderboardData
              .slice(userPosition, userPosition + 2)
              .map((user, index) => (
                <tr key={user.id} className="bg-[#FFF5EB] rounded-xl">
                  <td className="py-2 px-4 text-[#FD7B06] font-medium rounded-l-xl text-xl">{userPosition + index + 1}</td>
                  <td className="py-2 px-4 font-medium">{user.name}</td>
                  <td className="py-2 px-4 text-[#FD7B06]">{user.streak}</td>
                  <td className="py-2 px-4 text-[#FD7B06]">{user.questionsSolved}</td>
                  <td className="py-2 px-4 text-[#FD7B06] rounded-r-xl">{user.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Leaderboard;
