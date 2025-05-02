import user_icon from "../../assets/user_icon.svg";

function WelcomeAdmin() {
  const name = localStorage.getItem("firstName");

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col px-4 md:px-8 py-10">
      <div className="flex items-center gap-2">
        <img
          src={user_icon}
          alt="Admin Avatar"
          className="w-12 h-12 rounded-full"
        />

        <h2 className="text-xl sm:text-2xl font-bold text-[#FD7B06]">Welcome Back, <span className="text-[#006F6A]">{name}</span></h2>
      </div>
    </div>
  );
};

export default WelcomeAdmin;
