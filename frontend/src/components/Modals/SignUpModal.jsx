import { useState } from "react";

import passwordIcon from "../../assets/password.svg";
import googleIcon from "../../assets/google.svg";
import foxHead from "../../assets/fox_head.svg";
import emailIcon from "../../assets/email.svg";
import kfupmIcon from "../../assets/kfupm.svg";
import eyeIcon from "../../assets/eye.svg";

function SignUpModal({ onClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const [message, setMessage] = useState({ text: "", color: "" });

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      setMessage({ text: "Please fill all the fields", color: "red" });
      return;
    }

    if (!isAgree) {
      setMessage({ text: "You must agree to the terms and conditions", color: "red" });
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (response.ok) {
      setMessage({ text: "Sign up successful", color: "green" });
      onSwitchToLogin();
    }

    if (response.status === 400) {
      const data = await response.json();
      setMessage({ text: data.message, color: "red" });
    }

    if (response.status === 500) {
      setMessage({ text: "Something went wrong", color: "red" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFF3E6] dark:bg-[#2C2620] rounded-[32px] px-8 pt-4 pb-8 shadow-2xl max-w-sm w-full relative">
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

        <form className="flex flex-col gap-4" onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}>
          {/* First and Last name */}
          <div className="flex gap-2">
            <div className="relative w-1/2">
              <img src={emailIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="First name" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
              />
            </div>
            <div className="relative w-1/2">
              <img src={emailIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Last name" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <img src={passwordIcon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" alt="Password" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <label className="flex items-center dark:text-slate-200">
                <input type="checkbox" className="mr-2" checked={isAgree} onChange={(e) => setIsAgree(e.target.checked)} />
                <span>
                  I agree to all the <span className="text-[#FD7B06] font-semibold">Terms</span> and <span className="text-[#FD7B06] font-semibold">Privacy Policies</span>
                </span>
              </label>
            </label>
          </div>

          {message.text && <p className={`text-${message.color}-500 text-sm`}>{message.text}</p>}

          {/* Submit */}
          <button type="submit" className="bg-[#006F6A] dark:bg-[#F97008] text-white rounded-lg py-3 font-semibold mt-2 w-full">
            SIGN UP
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-center mt-2 dark:text-slate-200">
          Already registered?{" "}
          <strong className="cursor-pointer" onClick={onSwitchToLogin}>
            Sign in
          </strong>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-sm text-gray-400 dark:text-slate-200">Or sign up with</span>
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
