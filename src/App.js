import "./App.css";
import React, { useContext, } from "react";
import Navbar from "./components/Utils/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Utils/PrivateRoute";
import Profile from "./pages/Profile";
import MyList from "./pages/MyList";
import Bought from "./pages/Bought";
import ChatPage from "./pages/ChatPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/auth/AuthContext";


const App = () => {

  const { isAuthenticated } = useContext(AuthContext);


  return (
    <div className="h-[100vh] w-[100vw]">
      <ToastContainer />
      <Navbar isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        {/* <Route path="mylist" element={<MyList/>}/>
        <Route path="/bought" element={<Bought/>}/> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} >
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/mylist"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/bought"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} >
              <Bought />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} >
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chatpage"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} >
              <ChatPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
