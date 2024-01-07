import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";


const PrivateRoute = ({isLoggedIn, children}) => {
    // const navigate = useNavigate();
    const {isAuthenticated} = useContext(AuthContext);
    if(isAuthenticated) {
        return children;
    }
    else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute;