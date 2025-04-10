// This component is used to display the statistics of the website
// It will be given a number and just show that number increasing from 0 to the given number
// It will be used in the Hero component

import { useState, useEffect } from "react";

function Statistic(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 2000 / props.number); // 2 seconds to reach the number

    if (count === props.number) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, props.number]);

  return (
    <p className="text-xl md:text-3xl font-bold text-[#FD7B06]">+{count}</p>
  );
}

export default Statistic;

