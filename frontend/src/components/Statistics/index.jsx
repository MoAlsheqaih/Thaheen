import usersIcon from "../../assets/Group 71.png";
import cartIcon from "../../assets/Group 69.png";
import docIcon from "../../assets/document.png";
import upArrow from "../../assets/Group 14.png";
import StatisticCard from "./StatisticCard";

const cardData = [
  {
    title: "Average time per session",
    value: "9.3",
    icon: cartIcon,
    iconSize: "w-[30.9px] h-[38.8px]",
    subtitle: "+15%",
    subtitleIcon: upArrow,
    linkText: "View Session",
    enableLink: false
  },
  {
    title: "Activities",
    value: "3500",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View All",
    enableLink: false
  },
  {
    title: "Questions",
    value: "3500",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View All",
    enableLink: false
  },
  {
    title: "Students",
    value: "43.5k",
    icon: usersIcon,
    iconSize: "w-[26.86px] h-[26.86px]",
    linkText: "View Students",
    linkHref: "#students",
    enableLink: true
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#FFF7EC] py-6 px-8 rounded-2xl">
      {cardData.map((card, index) => (
        <StatisticCard key={index} card={card} />
      ))}
    </div>
  );
};

export default StatsCards;
