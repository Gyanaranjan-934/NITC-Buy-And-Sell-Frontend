import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import frameImage from "../../assets/frame.png";
import "../../css/template.css";
const Template = ({ title, des1, des2, image, formtype, setIsLoggedIn }) => {
  return (
    <div className="flex flex-row w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 justify-between form-container">
      <div className="flex flex-col w-11/12 max-w-[450px] ">
        <h1
          className="text-[#333333] font-semibold text-[1.875rem]
                    leading-[3.375rem]"
        >
          {title}
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] mt-4">
          <span className="text-[#666666]">{des1}</span>
          <br />
          <span className="text-blue-500 italic">{des2}</span>
        </p>

        {formtype === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>

      <div className="relative w-11/12 max-w-[450px] image-container">
        <img
          src={frameImage}
          alt="pattern"
          width={558}
          height={504}
          loading="lazy"
          className=""
        />
        <img
          src={image}
          alt="students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4"
        />
      </div>
    </div>
  );
};

export default Template;
