import { useState } from "react";

import usageImage from "../../assets/Widget.png";

function UsageChart() {
  const [timeframe, setTimeframe] = useState("Yearly");

  return (
    <div className="bg-[#FFF7EC] rounded-xl p-4 w-full lg:w-2/3">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-orange-500 text-lg font-semibold">Usage</h2>
        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="appearance-none text-sm font-medium text-orange-500 bg-white border border-orange-300 rounded-md px-3 py-1 focus:outline-none"
          >
            <option
              value="Yearly"
              className="text-orange-500 bg-white hover:bg-orange-100"
            >
              Yearly
            </option>
            <option
              value="Monthly"
              className="text-orange-500 bg-white hover:bg-orange-100"
            >
              Monthly
            </option>
          </select>
        </div>
      </div>

      {/* This is a placeholder for the usage chart image */}
      <img src={usageImage} alt="Usage Chart" className="w-full rounded-md" />
    </div>
  );
};

export default UsageChart;