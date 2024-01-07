import React, { useContext } from "react";
import img from "./images/bgimg.png";
import "./App.css";
import { useState, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setIsAuthenticated, setUserData, refreshAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the fade-in animation after a delay (e.g., 1000 milliseconds)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    const userLocalStorageData = localStorage.getItem("NITCBuySellUserLocalData");
    
    if (userLocalStorageData) {
      if (userLocalStorageData?.data?.refreshToken) {
        if (userLocalStorageData?.data?.accessToken) {
          setIsAuthenticated(true);
          setUserData(userLocalStorageData);
        }else{
          // call for refresh access token to server
          console.log(userLocalStorageData);
          refreshAccessToken();
          navigate("/dashboard")
        }
      }
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`fade-in ${isVisible ? "active" : ""}`}>
      <div className="w-[100vw] h-[85vh] flex justify-center items-center text-3xl">
        {" "}
        <img src={img} alt="" className="w-full md:w-3/5 h-auto mb-20" />
        {/* Adjust the margin class */}
      </div>
    </div>
  );
};

export default Home;
