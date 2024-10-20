import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  console.log("backdne ", import.meta.env.VITE_BACKEND_URL);
  const initialFormData = {
    name: "",
    phone: "",
    company: "",
    email: "",
    size: undefined,
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleProceed = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/companies/register`,
        formData
      );
      console.log("res", res);
      return navigate("/verify");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between px-4 py-2 md:px-10 md:py-4">
        <div className="image cursor-pointer">
          <img
            src="../../public/logo.png"
            className="w-[80px] md:w-[100px]"
            alt="Logo"
          />
        </div>
        <div className="contact cursor-pointer">Contact</div>
      </div>
      <div className="flex flex-col md:flex-row bg-red-100 h-full">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-white">
          <p className="text-gray-600 text-base md:text-lg text-center md:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center bg-white">
          <form className="bg-white p-6 md:p-10 rounded-lg border border-[#3F71FF] w-[80%] max-w-md text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Sign Up</h2>
            <p className="text-gray-500 mb-6">
              Lorem Ipsum is simply dummy text
            </p>

            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                className="w-full px-3 py-2 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div className="mb-4">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Phone no."
                className="w-full px-3 py-2 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg"
                required
              />
            </div>

            {/* Company Name Input */}
            <div className="mb-4">
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="Company Name"
                className="w-full px-3 py-2 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg"
                required
              />
            </div>

            {/* Company Email Input */}
            <div className="mb-4">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Company Email"
                className="w-full px-3 py-2 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg"
                required
              />
            </div>

            {/* Employee Size Input */}
            <div className="mb-4">
              <input
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                type="number"
                placeholder="Employee Size"
                className="w-full px-3 py-2 border bg-[#F4F4F4] border-[#CCCCCC] rounded-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <p className="mt-4 text-sm text-gray-500">
              By clicking proceed, you will accept our{" "}
              <span className="text-blue-500 cursor-pointer">
                Terms <span className="text-black">&</span> Conditions
              </span>
            </p>
            <button
              onClick={handleProceed}
              className="w-full bg-[#0B66EF] text-white px-3 py-2 mt-3 rounded-lg font-bold"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
