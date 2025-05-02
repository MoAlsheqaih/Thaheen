import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AdminDashboardButton from "./AdminDashboardButton";
import UserDashboardButton from "./UserDashboardButton";
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
  const [email, setEmail] = useState("");

  // if there is a token, send a request to status with the token
  // if response is 200 and response.role is admin, show the admin dashboard button
  // if resepons is 200 and response.role is not admin, show the user dashboard button
  // if nothing, show CTA
  const [showAdminDashboard, setShowAdminDashboard] = useState(-1);
  const [showUserDashboard, setShowUserDashboard] = useState(-1);

  const checkStatus = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await fetch("http://localhost:3001/api/auth/status", {
        headers: {
          "x-auth-token": token
        }
      });

      if (response.ok) {
        const data = await response.json();

        if (data.role === "admin") {
          setShowUserDashboard(false);
          setShowAdminDashboard(true);
        } else if (data.role === null) {
          setShowUserDashboard(false);
          setShowAdminDashboard(false);
        } else {
          setShowUserDashboard(true);
          setShowAdminDashboard(false);
        }
      }
    } else {
      setShowUserDashboard(false);
      setShowAdminDashboard(false);
    }
  }

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <header className="bg-[#FFEAD6] dark:bg-[#006F6A] w-full py-2 px-5 relative z-10">
      <div className="flex justify-between items-center">

        <Link to="/">
          <img src={logo} alt="logo" className="w-32" />
        </Link>

        <div className="flex items-center gap-2">
          {showAdminDashboard === true && <AdminDashboardButton checkStatus={checkStatus} />}
          {showUserDashboard === true && <UserDashboardButton checkStatus={checkStatus} />}
          {showAdminDashboard === false && showUserDashboard === false && <CTA onClick={() => setShowLogin(true)} />}
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
          onSuccessLogin={(email) => {
            setShowLogin(false);
            setShowVerify(true);
            setEmail(email);
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
          email={email}
          onSuccessVerify={() => {
            setShowVerify(false);
            checkStatus();
          }}
        />
      )}
    </header>
  );
}

export default Header; 
