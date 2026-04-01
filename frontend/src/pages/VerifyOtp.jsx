import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const validValue = data.every((el) => el);

  const focusInput = (index) => {
    if (index >= 0 && index < 6) inputRef.current[index]?.focus();
  };

  const handleInputChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) {
      const digits = value.slice(0, 6).split("");
      const newData = [...data];
      digits.forEach((d, i) => {
        if (index + i < 6) newData[index + i] = d;
      });
      setData(newData);
      focusInput(Math.min(index + digits.length, 5));
      return;
    }
    const digit = value.slice(-1);
    const newData = [...data];
    newData[index] = digit;
    setData(newData);
    if (digit && index < 5) focusInput(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !data[index]) {
      e.preventDefault();
      if (index > 0) {
        const newData = [...data];
        newData[index - 1] = "";
        setData(newData);
        focusInput(index - 1);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const arr = pasted.split("").concat(Array(6 - pasted.length).fill(""));
    setData(arr);
    focusInput(Math.min(pasted.length, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await Axios.put(SummaryApi.VerifyOtp.url, {
        email,
        otp: data.join(""),
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <section className="w-full container mx-auto px-4 py-4 sm:px-2 min-h-[60vh] flex flex-col justify-center">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-xl p-5 sm:p-7 shadow-sm">
        <p className="font-semibold text-lg">Enter OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP</label>
            <div
              className="flex items-center gap-2 justify-between mt-3"
              onPaste={handlePaste}
            >
              {data.map((element, index) => (
                <input
                  key={"otp" + index}
                  type="text"
                  inputMode="numeric"
                  id={index === 0 ? "otp" : undefined}
                  ref={(el) => (inputRef.current[index] = el)}
                  value={data[index]}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  autoFocus={index === 0}
                  disabled={loading}
                  className="bg-blue-50 w-full max-w-12 sm:max-w-16 h-12 sm:h-14 p-2 border border-slate-300 rounded-lg outline-none focus:border-green-700 text-center font-semibold text-lg"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!validValue || loading}
            className={`${
              validValue && !loading ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-3 sm:py-2 rounded-lg font-semibold my-3 tracking-wide min-h-[44px] sm:min-h-0 disabled:opacity-70`}
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-green-700 hover:text-green-800">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
