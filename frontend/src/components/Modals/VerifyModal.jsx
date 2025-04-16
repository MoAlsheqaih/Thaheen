import { useState } from "react";

import passwordIcon from "../../assets/password.svg";
import eyeIcon from "../../assets/eye.svg";

function VerifyModal({ onClose, onBackToLogin }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] rounded-[32px] px-8 py-10 shadow-2xl max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <button
          onClick={onBackToLogin}
          className="text-sm text-[#006F6A] mb-4 flex items-center gap-1"
        >
          &lt; Back to login
        </button>

        <h2 className="text-2xl font-bold text-[#FD7B06] mb-2">Verify code</h2>
        <p className="text-sm text-[#006F6A] mb-6">
          An authentication code has been sent to your email.
        </p>

        <div className="relative mb-4">
          <img src={passwordIcon} alt="lock" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type={showCode ? "text" : "password"}
            placeholder="Enter code"
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

        <p className="text-sm text-center text-gray-500 mb-4">
          Didn’t receive a code?{" "}
          <span className="text-[#FD7B06] cursor-pointer">Resend</span>
        </p>

        <button className="bg-[#006F6A] text-white rounded-lg py-3 font-semibold w-full">
          VERIFY
        </button>

        <p className="text-sm text-center mt-2 text-gray-600">
          Have a problem? <strong className="text-black">Contact us</strong>
        </p>
      </div>
    </div>
  );
}

export default VerifyModal;

