import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../css/signupform.css";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    confirmPassword: "",
    phoneNo: ""
  });

  const [dataUploading, setDataUploading] = useState(false);
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { registerUser } = useContext(AuthContext);

  const changeHandler = (event) => {
    if (event.target.type === "file") {
      const file = event.target.files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    setDataUploading(true);

    // const emailPattern = /^[A-Za-z0-9._%+-]+@nitc\.ac\.in$/;
    // const isEmailValid = emailPattern.test(formData.email);



    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.avatar ||
      !formData.phoneNo
    ) {
      toast.error("Please enter all required fields correctly");
      setDataUploading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setDataUploading(false);
      return;
    }

    const isValidPhoneNumber = /^\d{10}$/.test(formData.phoneNo);
    if (!isValidPhoneNumber) {
      toast.error("Phone number must be a valid number");
      setDataUploading(false);
      return;
    }

    try {
      const registeredUserData = await registerUser(formData)

      if (registeredUserData) {
        setDataUploading(false);
        toast.success(registeredUserData?.data?.message);
        navigate("/login");
      } else {
        setDataUploading(false);
      }

    } catch (error) {
      console.error(error);
      setDataUploading(false);
    }
  };


  return (
    <div className="mt-6">
      <form
        onLoad={dataUploading ? () => { } : undefined}
        onSubmit={submitHandler}
        className="flex flex-col w-full gap-y-4"
        encType="multipart/form-data"
      >
        <label className="w-full">
          <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
            Full Name<sup className="text-rose-500">*</sup>
          </p>
          <input
            type="text"
            required
            name="fullName"
            onChange={changeHandler}
            placeholder="Enter Full Name"
            value={formData.fullName}
            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
          />
        </label>
        <label className="w-full">
          <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
            username<sup className="text-rose-500">*</sup>
          </p>
          <input
            type="text"
            required
            name="username"
            onChange={changeHandler}
            placeholder="Enter unique username"
            value={formData.username}
            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
          />
        </label>
        <label className="w-full">
          <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
            Email Address<sup className="text-rose-500">*</sup>
          </p>
          <input
            type="email"
            required
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email Address"
            value={formData.email}
            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
          />
        </label>

        <label className="w-full">
          <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-rose-500">*</sup>
          </p>
          <input
            type="phone"
            required
            name="phoneNo"
            onChange={changeHandler}
            placeholder="Enter Phone Number"
            value={formData.phoneNo}
            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
          />
        </label>
        <div className="flex gap-x-4 x-fields">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
              Create Password<sup className="text-rose-500">*</sup>
            </p>
            <input
              type={showPassword1 ? "text" : "password"}
              required
              name="password"
              onChange={changeHandler}
              placeholder="Enter password"
              value={formData.password}
              className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
            />
            <span
              onClick={() => setShowPassword1((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showPassword1 ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2bf" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-rose-500">*</sup>
            </p>
            <input
              type={showPassword2 ? "text" : "password"}
              required
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
            />
            <span
              onClick={() => setShowPassword2((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showPassword2 ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#afb2bf" />
              )}
            </span>
          </label>
        </div>
        <label className="w-full">
          <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
            Profile Picture
          </p>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
            onChange={changeHandler}
          />
        </label>
        <button
          className="w-full border border-blue-700 bg-blue-500 hover:bg-blue-600 rounded-[8px] font-medium text-white px-[12px] py-[8px] mt-6 transition-all duration-300 ease-out"
          type="submit"
          {...(dataUploading?"disabled":{})}
        >
          {dataUploading ? "Registering User..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
