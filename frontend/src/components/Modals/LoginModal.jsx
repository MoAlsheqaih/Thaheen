import { useState } from "react";

import passwordIcon from "../../assets/password.svg";
import googleIcon from "../../assets/google.svg";
import foxHead from "../../assets/fox_head.svg";
import kfupmIcon from "../../assets/kfupm.svg";
import emailIcon from "../../assets/email.svg";
import eyeIcon from "../../assets/eye.svg";

function LoginModal({ onClose, onSwitchToSignUp, onSuccessLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="className= bg-[#FFF3E6] rounded-[32px] px-8 pt-10 pb-8 shadow-2xl max-w-sm w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-4 text-2xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {/* Fox image */}
        <div className="absolute -top-4 left-1/4 -translate-x-1/2 -translate-y-1/2">
          <img src={foxHead} alt="Fox" className="w-24 h-24" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-[#FD7B06] text-center mb-6">
          Welcome Back!
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fakeEmail = "user@example.com";
            const fakePassword = "123456";
            const inputEmail = e.target.email.value;
            const inputPassword = e.target.password.value;

            if (inputEmail === fakeEmail && inputPassword === fakePassword) {
              setTimeout(() => {
                onClose();         
                onSuccessLogin();  // show verification modal
                
              }, 200); // 200ms delay just for smoother transition
            }
          }}>
          <div className="relative">
            <img src={emailIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Email" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
            />
          </div>
          <div className="relative">
            <img src={passwordIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Password" />
            <input
              name="password"
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

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-1 text-[#006F6A]">
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className="text-[#FF8682]">
              Forgot Password
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#006F6A] text-white rounded-lg py-3 font-semibold mt-2 w-full"
          >
            LOG IN
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-sm text-center mt-2">
          Don’t have an account?{" "}
          <strong className="cursor-pointer" onClick={onSwitchToSignUp}>
            Sign up
          </strong>
        </p>

        {/* Divider with text*/}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-sm text-gray-400">Or login with</span>
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

export default LoginModal;
