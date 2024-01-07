import React, { useContext } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";


const PrivateRoute = ({isLoggedIn, children}) => {
    // const navigate = useNavigate();
    const navigate = useNavigate();
    const {isAuthenticated} = useContext(AuthContext);
    if(isAuthenticated) {
        return children;
    }
    else {
        navigate("/login")
    }
}

export default PrivateRoute;