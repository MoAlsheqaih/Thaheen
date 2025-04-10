import { Link } from "react-router-dom";

import DarkModeToggle from "./DarkModeToggle";
import logo from "../../assets/logo.svg";
import CTA from "./CTA";

function Header() {
  return (
    <header className="bg-[#FFEAD6] w-full py-2 px-5">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32" />
        </Link>

        <div className="flex items-center gap-2">
          <CTA />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header; 