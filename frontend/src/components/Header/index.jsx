import { Link } from "react-router-dom";
import { useState } from "react";

import VerifyModal from "../Modals/VerifyModal";
import SignUpModal from "../Modals/SignUpModal";
import LoginModal from "../Modals/LoginModal";
import DarkModeToggle from "./DarkModeToggle";
import logo from "../../assets/logo.svg";
import CTA from "./CTA";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  return (
    <header className="bg-[#FFEAD6] w-full py-2 px-5 relative z-10">
      <div className="flex justify-between items-center">

        <Link to="/">
          <img src={logo} alt="logo" className="w-32" />
        </Link>
        
        <div className="flex items-center gap-2">
          <CTA onClick={() => setShowLogin(true)} />
          <DarkModeToggle />
        </div>
      </div>
      
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToSignUp={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
          onSuccessLogin={() => {
            setShowLogin(false);
            setShowVerify(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSwitchToLogin={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}

        />
      )}

      {showVerify && (
        <VerifyModal
          onClose={() => setShowVerify(false)}
          onBackToLogin={() => {
            setShowVerify(false);
            setShowLogin(true);
          }}
        />
      )}
    </header>
  );
}

export default Header; 
