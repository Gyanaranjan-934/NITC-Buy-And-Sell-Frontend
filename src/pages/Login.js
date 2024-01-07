import React from "react";
import Template from "../components/Auth/Template";
import loginImage from "../assets/login.png";

const Login = ({setIsLoggedIn}) => {
    return (
        
            <Template
                title="Welcome Back"
                des1="Log in to your account to access all the great features."
                des2="Don't have an account yet? You can easily sign up and join us!"
                image={loginImage}
                formtype="login"
                setIsLoggedIn={setIsLoggedIn}/>
        
    )
}

export default Login; 