import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const {setUser,setIsAuthenticated,getUserData} = useContext(AuthContext)
  const {
    loginUser,
  } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const logInData = await loginUser(formData);
      if (logInData.success) {
        setLoading(false);
        toast.success(logInData.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setLoading(false);
        toast.error(logInData.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message);
    }
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem] text-[#333333]">
          Email Address<sup className="text-rose-500">*</sup>
        </p>
        <input
          type="email"
          required
          value={formData.email}
          onChange={changeHandler}
          autoComplete="email"
          placeholder="Enter Email Address"
          name="email"
          className="rounded-[0.5rem] w-full p-[12px] border-2 text-[#777777]"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] mb-1 leading-[1.375rem] text-[#333333]">
          Password<sup className="text-rose-500">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="rounded-[0.5rem] w-full p-[12px] border-2 text-[#777777]"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#afb2bf" />
          )}
        </span>
      </label>
      <Link to="#">
        <p className="text-xs mt-1 text-slate-400 hover:text-slate-600 max-w-max ml-auto">
          Forgot Password
        </p>
      </Link>

      <button
        className="w-full border border-blue-700 bg-blue-500 hover:bg-blue-600 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 transition-all duration-300 ease-out"
        type="submit"
      >
        {loading? "Logging in...":"Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
