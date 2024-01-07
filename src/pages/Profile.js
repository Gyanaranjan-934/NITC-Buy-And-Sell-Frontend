import React from "react";
import ProfileView from "../components/Auth/Profile_View";

const Profile = (formData) => {
  // Setting temporary values for user data
  // Will take formData object values during actual implementation
  return (
    <div className="w-[100vw] h-[85vh] flex justify-center items-center">  
      <ProfileView  />
    </div>
  );
};

export default Profile;
