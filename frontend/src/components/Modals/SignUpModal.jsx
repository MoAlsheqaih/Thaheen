import { useState } from "react";

import passwordIcon from "../../assets/password.svg";
import googleIcon from "../../assets/google.svg";
import foxHead from "../../assets/fox_head.svg";
import emailIcon from "../../assets/email.svg";
import kfupmIcon from "../../assets/kfupm.svg";
import eyeIcon from "../../assets/eye.svg";

function SignUpModal({ onClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] rounded-[32px] px-8 pt-4 pb-8 shadow-2xl max-w-sm w-full relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Fox image */}
        <div className="absolute -top-4 left-1/3 -translate-x-1/2 -translate-y-1/2">
          <img src={foxHead} alt="Fox" className="w-24 h-24" />
        </div>

        <h2 className="text-xl font-bold text-[#FD7B06] text-center mb-6">SIGN UP</h2>

        <form className="flex flex-col gap-4">
          {/* First and Last name */}
          <div className="flex gap-2">
            <div className="relative w-1/2">
              <img src={emailIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="First name" />
              <input
                type="text"
                placeholder="First name"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
              />
            </div>
            <div className="relative w-1/2">
              <img src={emailIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Last name" />
              <input
                type="text"
                placeholder="Last name"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <img src={emailIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Email" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <img src={passwordIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Password" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-white border border-gray-200 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <img src={eyeIcon} className="w-5 h-5" alt="Toggle password visibility" />
            </button>
          </div>

          {/* Checkbox */}
          <div className="text-sm text-[#666]">
            <label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>
                  I agree to all the <span className="text-[#FD7B06] font-semibold">Terms</span> and <span className="text-[#FD7B06] font-semibold">Privacy Policies</span>
                </span>
              </label>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="bg-[#006F6A] text-white rounded-lg py-3 font-semibold mt-2 w-full">
            SIGN UP
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-center mt-2">
        Already registered?{" "}
          <strong className="cursor-pointer" onClick={onSwitchToLogin}>
            Sign in
          </strong>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-sm text-gray-400">Or sign up with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social login */}
        <div className="flex items-center justify-center gap-4">
          <button className="border border-gray-300 w-12 h-12 rounded-lg overflow-hidden">
            <img src={kfupmIcon} alt="KFUPM login" className="w-full h-full object-cover" />
          </button>
          <button className="border border-gray-300 w-12 h-12 rounded-lg overflow-hidden">
            <img src={googleIcon} alt="Google login" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
