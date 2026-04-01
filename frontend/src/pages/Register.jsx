import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (data.password !== data.confirmPassword) {
      toast.error("Password doesn't match");
      return;
    }

    try {
      const response = await Axios.post(
        SummaryApi.register.url, // or your register URL
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      );

      if(response.data.error){
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message)
        setData({
          name : "",
          email : "",
          password : "",
          confirmPassword : ""
        })
        navigate("/login")
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-4 py-4 sm:px-2 min-h-[60vh] flex flex-col justify-center">
      <div className="app-surface my-4 w-full max-w-lg mx-auto rounded-xl p-5 sm:p-7">
        <p className="app-heading text-lg">Create account</p>

        <form className="grid gap-2 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1  rounded">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              autoFocus
              className="app-input"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="grid gap-1 rounded">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              className="app-input"
              name="email"
              value={data.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1 rounded">
            <label htmlFor="password">Password : </label>
            <div className="app-input flex rounded items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoFocus
                className="w-full outline-none border-none bg-transparent"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1 rounded">
            <label htmlFor="confirmPasswordpassword">Confirm Password : </label>
            <div className="app-input flex rounded items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password"
                autoFocus
                className="w-full outline-none border-none bg-transparent"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!validateValue}
            className={`${validateValue ? "app-btn app-btn-primary" : "bg-slate-600 text-white"} w-full rounded-lg border font-semibold my-3 py-3 sm:py-2 tracking-wide min-h-[44px] sm:min-h-0`}
          >
            Register Now
          </button>
        </form>

        <p>
          Already have an account ?{" "}
          <Link to="/login" className="font-semibold text-neutral-900 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Register;
