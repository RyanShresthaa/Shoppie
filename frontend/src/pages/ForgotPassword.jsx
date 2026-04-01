import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const validateValue = Object.values(data).every((el) => el !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.put(
        SummaryApi.forgotPassword.url,
        {
          email: data.email,
        },
      );

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
        });
        navigate("/verification-otp", { state: { email: data.email } });
      }

      console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-4 py-4 sm:px-2 min-h-[60vh] flex flex-col justify-center">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-xl p-5 sm:p-7 shadow-sm">
        <p className="font-bold text-lg">Forgot Password?</p>
        <form className="grid gap-4 py-6" onSubmit={handleSubmit}>
          <div className="grid gap-1 rounded">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 outline-none focus:border-primary-dark rounded border"
              name="email"
              value={data.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={!validateValue}
            className={`${validateValue ? "bg-green-900" : "bg-slate-600"} text-white rounded-lg border font-semibold my-3 py-3 sm:py-2 tracking-wide min-h-[44px] sm:min-h-0`}
          >
            Send OTP
          </button>
        </form>

        <p>
          Back to Login{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
