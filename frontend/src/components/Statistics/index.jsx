import { useState, useEffect } from "react";

import usersIcon from "../../assets/Group 71.png";
import docIcon from "../../assets/document.png";
import StatisticCard from "./StatisticCard";

const cardData = [
  {
    title: "Courses",
    value: "...",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View Courses",
    linkHref: "#courses",
    enableLink: true
  },
  {
    title: "Activities",
    value: "N/A",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View All",
    enableLink: false
  },
  {
    title: "Questions",
    value: "...",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View Questions",
    linkHref: "/",
    enableLink: true
  },
  {
    title: "Students",
    value: "...",
    icon: usersIcon,
    iconSize: "w-[26.86px] h-[26.86px]",
    linkText: "View Students",
    linkHref: "#students",
    enableLink: true
  },
];

function StatsCards() {
  const [stats, setStats] = useState(cardData);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/statistics`);
      const data = await response.json();

      setStats(cardData.map((card) => {
        if (card.title === "Courses") {
          return { ...card, value: data.courses };
        }

        if (card.title === "Questions") {
          return { ...card, value: data.questions };
        }

        if (card.title === "Students") {
          return { ...card, value: data.users };
        }

        return card;
      }));
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#FFF7EC] py-6 px-8 rounded-2xl">
      {stats.map((card, index) => (
        <StatisticCard key={index} card={card} />
      ))}
    </div>
  );
};

export default StatsCards;
