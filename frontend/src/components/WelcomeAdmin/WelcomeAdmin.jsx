import React from "react";
import user_icon from "../../assets/user_icon.svg";


const WelcomeAdmin = () => {
  return (
    <div className="mt-4 mb-2 flex items-center gap-4">
      <img
        src={user_icon}
        alt="Admin Avatar"
        className="w-12 h-12 rounded-full"
      />
      <h1 className="text-xl font-semibold text-[#FD7B06]">
        Welcome back, Admin!
      </h1>
    </div>
  );
};

export default WelcomeAdmin;
