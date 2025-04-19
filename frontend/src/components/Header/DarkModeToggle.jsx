import { useEffect, useState } from "react";

import fox_on_moon from "../../assets/fox_on_moon.png";
import fox_on_sun from "../../assets/fox_on_sun.png";

function DarkModeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.theme === "dark" ? "dark" : "light";
    }

    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-[#006F6A] hover:bg-[#006f6a]/80 dark:bg-[#F97008] dark:hover:bg-[#F97008]/80 transition-all text-white p-2 rounded-2xl font-semibold drop-shadow-[0_4px_0_#00A59D] dark:drop-shadow-[0_4px_0_#F7AB73] text-sm sm:text-base relative"
    >
      <p className="invisible">OO</p>

      {theme === "dark" ? (
        <img
          src={fox_on_sun}
          alt="Light"
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-12"
        />
      ) : (
        <img
          src={fox_on_moon}
          alt="Dark"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12"
        />
      )}
    </button>
  );
}

export default DarkModeToggle;