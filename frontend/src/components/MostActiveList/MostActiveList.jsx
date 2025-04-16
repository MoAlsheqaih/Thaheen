import React, { useEffect, useState } from "react";

const users = [
  { name: "ALI", points: 400 },
  { name: "NASSER", points: 250 },
  { name: "MOHAMMED", points: 220 },
  { name: "SALAH", points: 180 },
];

const maxPoints = Math.max(...users.map((u) => u.points));

const MostActiveList = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 300); // slight delay for animation
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-[#FFF7EC] rounded-xl p-4 w-full lg:w-1/3 shadow">
      <h2 className="text-lg font-semibold text-orange-500 mb-4">Most Active</h2>
      <div className="space-y-3">
        {users.map((user, idx) => {
          const percentage = (user.points / maxPoints) * 100;

          return (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-sm text-[#444]">{user.name}</span>
                <span className="text-sm text-gray-600">{user.points}</span>
              </div>
              <div className="w-full bg-orange-100 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-6 text-xs font-bold text-white flex items-center justify-end pr-2 rounded-full transition-all duration-1000 ease-out ${
                    animate ? "w-[" + percentage + "%]" : "w-0"
                  }`}
                  style={{
                    width: animate ? `${percentage}%` : "0%",
                    background: "linear-gradient(to right, #FBBF24, #FDBA74)",
                  }}
                >
                  {/* Optional inline score */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostActiveList;
