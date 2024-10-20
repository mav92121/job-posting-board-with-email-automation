import axios from "axios";
import { set } from "mongoose";
import { useState } from "react";
const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const handleEmailVerify = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/companies/verify/email`,
        { emailOtp }
      );
      setEmailOtp("");
      setIsEmailVerified(true);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between px-4 py-3">
        <div className="image cursor-pointer">
          <img src="../../public/logo.png" className="w-24" alt="no" />
        </div>
        <div className="contact cursor-pointer">Contact</div>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <p className="text-gray-600 text-center text-sm md:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center bg-white text-center">
          <div className="bg-white p-6 md:p-10 rounded-lg border border-[#3F71FF] w-[80%] max-w-sm md:max-w-md lg:max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-700">
              Sign Up
            </h2>
            <p className="text-gray-500 mb-6 text-sm md:text-base">
              Lorem Ipsum is simply dummy text
            </p>

            {/* Email OTP Input */}
            <div className="flex flex-col mb-4 relative">
              <input
                type="text"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                disabled={isEmailVerified}
                placeholder="Email OTP"
                className="w-full  py-1 px-3 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg mb-3 text-sm md:text-base"
                required
              />
              {!isEmailVerified && (
                <button
                  onClick={handleEmailVerify}
                  className="bg-[#0B66EF] text-white py-1 px-3 font-bold rounded-lg w-full"
                >
                  Verify
                </button>
              )}
              {isEmailVerified && (
                <div className="absolute right-2 top-[6px]">
                  <img
                    src="../../public/check_circle.png"
                    alt="Verified"
                    className="w-5 h-5"
                  />
                </div>
              )}
            </div>

            {/* Mobile OTP Input */}
            <div className="flex flex-col relative">
              <input
                type="text"
                disabled={isVerified}
                placeholder="Mobile OTP"
                className="w-full py-1 px-3 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg mb-3 text-sm md:text-base"
                required
              />
              {!isVerified && (
                <button className="bg-[#0B66EF] text-white py-1 px-3 font-bold rounded-lg  w-full">
                  Verify
                </button>
              )}
              {isVerified && (
                <div className="absolute right-2 top-[6px]">
                  <img
                    src="../../public/check_circle.png"
                    alt="Verified"
                    className="w-5 h-5"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
