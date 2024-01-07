import React from "react";
import Template from "../components/Auth/Template";
import signupImage from "../assets/signup.png";

const Signup = ({setIsLoggedIn}) => {
    return (
        <Template
        title="Create an Account"
        des1="Join our community and get started today!"
        des2="Already have an account? You can log in here."
        image={signupImage}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}/>
    )
}

export default Signup;