import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/nitc_logo_icon.svg";
import { toast } from "react-hot-toast";
import AddandEditPopup from "../Product/AddandEditPopup";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import axios from "axios";

export const Navbar = ({isAuthenticated}) => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to open the popup
  // State to control the visibility of the menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const host = process.env.REACT_APP_SERVER_URI

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Function to hide the menu
  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const openPopup = () => {
    setIsMenuVisible(false);
    setIsPopupVisible(true);
  };
  

  const handleLogout = async () => {
    hideMenu();
    let token = sessionStorage.getItem("NITCBuySellUserAccessToken");
    const response = await axios.post(
      `${host}/users/logout`,
      {

      },
      {
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      }
    )
    toast.success(response?.data?.message);
    setIsAuthenticated(false);
    sessionStorage.removeItem("NITCBuySellUserAccessToken");
    localStorage.removeItem("NITCBuySellUserLocalData");
    navigate("/login");
  }

  return (
    <nav className="flex justify-between items-center h-fit pt-4 relative px-4">
      {/* image */}
      <div className="flex items-center align-baseline pl-6">
        <Link to={isAuthenticated ? "/dashboard" : "/"}>
          <img src={logo} alt="logo" width={60} height={32} loading="lazy" />
        </Link>
      </div>
      {/* hamburger */}
      <div className="hamburger">
        <input
          id="menu-toggle"
          type="checkbox"
          checked={isMenuVisible}
          onChange={toggleMenu}
        />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>

        <div className="menu">
          {!isAuthenticated && (
            <nav>
              <ul className="link-list">
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/">Home</Link>
                </li>
                <li className="group relative mt" onClick={hideMenu}>
                  <Link to="/about">About</Link>
                </li>
                <li className="group relative mt" onClick={hideMenu}>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          )}
          {isAuthenticated && (
            <nav>
              <ul className="link-list">
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/bought">Bought</Link>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/mylist">My List</Link>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <button onClick={openPopup} className="cursor-pointer">
                    Add Item
                  </button>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/chatpage">Chats</Link>
                </li>
                <li className="group relative" onClick={hideMenu}>
                  <Link to="/profile">Profile</Link>
                </li>
              </ul>
            </nav>
          )}
          {/* login-signup-logout-dashboard */}
          <nav>
            <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-4">
              {!isAuthenticated && (
                <Link to="/login">
                  <button
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                    onClick={hideMenu}
                  >
                    Log In
                  </button>
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/signup">
                  <button
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                    onClick={hideMenu}
                  >
                    Sign Up
                  </button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/">
                  <button
                    onClick={handleLogout}
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                  >
                    Log Out
                  </button>
                </Link>
              )}
              {isAuthenticated && (
                <Link to="/dashboard">
                  <button
                    className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
                    w-full bg-blue-500 hover:bg-blue-600 font-medium text-white
                    transition-all duration-300 ease-out"
                    onClick={hideMenu}
                  >
                    Dashboard
                  </button>
                </Link>
              )}

              {/* Render the popup component with visibility controlled by the state */}
              {isPopupVisible && (
                <AddandEditPopup
                  onClose={() => setIsPopupVisible(false)} // Pass a function to close the popup
                />
              )}
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};
