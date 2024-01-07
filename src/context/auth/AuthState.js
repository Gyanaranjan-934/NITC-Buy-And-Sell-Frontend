import React, { useState } from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'


const AuthState = (props) => {
    
    const [userData, setUserData] = useState(null)

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [user, setUser] = useState(null)

    const host = process.env.REACT_APP_SERVER_URI

    

    const getConfig = () => { 
        let token = sessionStorage.getItem("NITCBuySellUserAccessToken");
        if(token) {
            token = token?.substring(1, token.length-1);
        }
        const config = {
            headers: {
                "Content-type": "application/json",
                'Authorization':`Bearer ${token}`
            },
        };

        return config;
    }

    


    

    const refreshAccessToken = async (refreshToken) => {

        const tokenDetails = (await axios.get(`${host}/users/refresh-token`, getConfig())).data

        const newUserData = userData;

        newUserData.accessToken = tokenDetails.accessToken

        newUserData.refreshToken = tokenDetails.refreshToken

        localStorage.setItem("NITCBuySellUserLocalData",JSON.stringify(newUserData));

        setUserData(newUserData)
    }

    const loginUser = async (loginUserData) => {
        console.log(host);
        let loggedInData = (await axios.post(
            `${host}/users/login`,
            loginUserData,
            getConfig()
        ));
        loggedInData = loggedInData.data;
        if (loggedInData.success) {
            setUser(loggedInData.data.user._id)
            setUserData(loggedInData.data.user)
            localStorage.setItem("NITCBuySellUserLocalData", JSON.stringify(loggedInData.data));
            sessionStorage.setItem("NITCBuySellUserAccessToken", JSON.stringify(loggedInData?.data?.accessToken))
            setIsAuthenticated(true)
        }else{
            console.error(loggedInData);
        }
        
        return loggedInData;
        
    }

    const registerUser = async (registerUserData) => {
        try {
            const formData = new FormData();
            formData.append('avatar', registerUserData.avatar);
            formData.append('fullName', registerUserData.fullName);
            formData.append('email', registerUserData.email);
            formData.append('username', registerUserData.username);
            formData.append('password', registerUserData.password);
            formData.append('phoneNo', registerUserData.phoneNo);


            const registeredUserData = await axios.post(`${host}/users/register`, formData);

            if (registeredUserData) {
                const userDataFromResponse = registeredUserData.data.data;
                setUserData(userDataFromResponse);
                setIsAuthenticated(true);
                localStorage.setItem("NITCBuySellUserLocalData", JSON.stringify(userDataFromResponse));
                return registeredUserData;
            }

        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Registration failed");
        }
    };

    const editUserData = async (editedData) => {
        try {
            const editedUserData = await axios.put(`${host}/users/update-account`, editedData, getConfig);

            if(editedUserData?.success) {
                const updatedData = editedUserData.data.data;
                setUserData(updatedData);
            }
            return editedUserData;
        } catch (error) {
            console.error("Error in editUserData:", error);
            toast.error(error?.message || "Error updating user data");
            // throw error;
        }
    };


    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            userData,
            setUserData,
            editUserData,
            refreshAccessToken,
            loginUser,
            registerUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState