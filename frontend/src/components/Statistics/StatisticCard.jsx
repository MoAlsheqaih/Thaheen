function StatisticCard({ card }) {
  return (
    <div className="bg-white rounded-xl px-6 py-5 flex flex-col justify-between shadow-sm">
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
          href={card.linkHref}
          className={`text-xs font-medium hover:underline ${card.enableLink ? "block text-orange-500" : "cursor-not-allowed text-gray-400"}`}
        >
          {card.linkText}
        </a>
      </div>
    </div>
  );
};

export default StatisticCard; 