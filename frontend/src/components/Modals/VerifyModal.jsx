import { useState } from "react";

import passwordIcon from "../../assets/password.svg";
import eyeIcon from "../../assets/eye.svg";

function VerifyModal({ onClose, onBackToLogin, email, onSuccessVerify }) {
  const [showCode, setShowCode] = useState(false);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!code) {
      setError("Please enter the code");
      return;
    }

    const response = await fetch("http://localhost:3001/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: code }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const name = data.name;

      localStorage.setItem("token", token);
      localStorage.setItem("firstName", name.first);
      localStorage.setItem("lastName", name.last);

      onSuccessVerify();
    }

    if (response.status === 400) {
      const data = await response.json();
      setError(data.message);
    }

    if (response.status === 500) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] dark:bg-[#2C2620] rounded-[32px] px-8 py-10 shadow-2xl max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 dark:text-slate-200 hover:text-gray-600"
        >
          &times;
        </button>

        <button
          onClick={onBackToLogin}
          className="text-sm text-[#006F6A] dark:text-[#FD7B06] mb-4 flex items-center gap-1"
        >
          &lt; Back to login
        </button>

        <h2 className="text-2xl font-bold text-[#FD7B06] mb-2">Verify code</h2>
        <p className="text-sm text-[#006F6A] dark:text-slate-200 mb-6">
          An authentication code has been sent to your email.
        </p>

        <div className="relative mb-4">
          <img src={passwordIcon} alt="lock" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type={showCode ? "text" : "password"}
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full bg-white border border-gray-200 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <img src={eyeIcon} alt="toggle" className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 dark:text-slate-200 mb-4">
          Didn’t receive a code?{" "}
          <span className="text-[#FD7B06] cursor-not-allowed">Resend</span>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button onClick={handleVerify} className="bg-[#006F6A] dark:bg-[#F97008] text-white rounded-lg py-3 font-semibold w-full mt-2">
          VERIFY
        </button>

        <p className="text-sm text-center mt-2 text-gray-600 dark:text-slate-200">
          Have a problem? <strong className="text-black dark:text-white">Contact us</strong>
        </p>
      </div>
    </div>
  );
}

export default VerifyModal;

