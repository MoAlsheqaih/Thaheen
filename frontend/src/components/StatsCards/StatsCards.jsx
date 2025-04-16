import React from "react";
import cartIcon from "../../assets/Group 69.png";
import docIcon from "../../assets/document.png";
import usersIcon from "../../assets/Group 71.png";
import upArrow from "../../assets/Group 14.png";

const cardData = [
  {
    title: "Average time per session",
    value: "9.3",
    icon: cartIcon,
    iconSize: "w-[30.9px] h-[38.8px]",
    subtitle: "+15%",
    subtitleIcon: upArrow,
    linkText: "View Session",
  },
  {
    title: "Activities",
    value: "3500",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View All",
  },
  {
    title: "Questions",
    value: "3500",
    icon: docIcon,
    iconSize: "w-[25.75px] h-[30px]",
    linkText: "View All",
  },
  {
    title: "Students",
    value: "43.5k",
    icon: usersIcon,
    iconSize: "w-[26.86px] h-[26.86px]",
    linkText: "View Students",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#FFF7EC] py-6 px-8 rounded-2xl">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl px-6 py-5 flex flex-col justify-between shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-[#1D1E25] leading-tight">{card.value}</p>
              {card.subtitle && (
                <div className="flex items-center text-green-500 text-sm mt-1">
                  <img
                    src={card.subtitleIcon}
                    alt="arrow"
                    className="w-5 h-5 mr-1"
                  />
                  {card.subtitle}
                </div>
              )}
            </div>
            <img
              src={card.icon}
              alt="icon"
              className={`${card.iconSize} mt-1`}
            />
          </div>
          <div className="text-right mt-1">
            <a
              href="#"
              className="text-xs font-medium text-orange-500 hover:underline"
            >
              {card.linkText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
