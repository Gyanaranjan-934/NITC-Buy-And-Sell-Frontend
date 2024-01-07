import { Navigate } from "react-router-dom";

const PrivateRoute = ({isAuthenticated, children}) => {
    
    if(isAuthenticated) {
        return children;
    }
    else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute;