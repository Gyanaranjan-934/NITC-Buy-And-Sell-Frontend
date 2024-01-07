import React, { useState } from "react";
import star from "../images/Star_icon.png";
import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import toast from "react-hot-toast";


function ProfileView() {
  const { userData, editUserData } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState(userData);
  const rating = userData.tot_rating / userData.tot_no_rating;
  const roundedRating = rating.toFixed(2);
  const [isEditing, setIsEditing] = useState(false);




  // useState variable to keep Edited data that will replace existing data
  // function to continuously edit isEditing variable with each user input
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Check if the input field is 'phoneNo' and the input is not numeric
    if (name === "phoneNo" && !/^\d*$/.test(value)) {
      toast.error("Phone number is not valid");
    }


    if (name === "phoneNo" && value.length > 10) {
      const truncatedValue = value.slice(0, 10);
      setEditedUser({
        ...editedUser,
        [name]: truncatedValue,
      });
    } else {
      // Update the state with the input value
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  // function to go into Edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {

      const editedUserData = await editUserData(editedUser)
      if(editedUserData){
        toast.success(editedUserData?.data?.message);
      }
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };



  // renders View or Edit mode depending on state of isEditing variable
  return (
    <div className="w-full sm:w-[380px] md:w-[440px] m-2 p-6 sm:p-12 border rounded-lg shadow-xl bg-white">
      <div className="flex justify-center mb-6 mt-[-16px]">
        <img src={userData?.avatar} alt={userData?.fullName} className="w-[80px] rounded-full" />
      </div>
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <label className="block mb-4">
            <strong className="text-[#444444]">Name:</strong>
            <input
              type="text"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleInputChange}
              className="border-2 rounded-md p-2 w-full text-[#666666]"
            />
          </label>

          <label className="block mb-4">
            <strong className="text-[#444444]">Phone No:</strong>
            <input
              type="text"
              name="phoneNo"
              value={editedUser.phoneNo}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              title="Enter a numeric value of 10 digits" // Custom error message
              maxLength="10" // Limit input to 10 characters
              className="border-2 rounded-md p-2 w-full text-[#666666]"
            />
          </label>

          {/* <label className="w-full mb-4">
            <p className="text-[0.875rem] text-[#333333] mb-1 leading-[1.375rem]">
              Profile Picture
            </p>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange={(e) => {
                const file = e.target.files[0];
                setSelectedImage(file);
              }}
              className="rounded-[0.5rem] text-[#777777] border-2 w-full p-[12px]"
            />
          </label> */}

          <div className="text-center">
            <button
              type="submit"
              onClick={handleSaveClick}
              className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
              w-[116px] bg-blue-500 hover:bg-blue-600 font-medium text-white
              transition-all duration-300 ease-out"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div>
          <ul>
            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Name:</strong>{" "}
              <p>{userData.fullName}</p>
            </li>
            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Email:</strong>{" "}
              <p>{userData?.email}</p>
            </li>
            <li className="mb-7 flex gap-2">
              <strong className="text-[#444444]">Phone No:</strong>{" "}
              <p>{userData?.phoneNo}</p>
            </li>
            <li className="mb-7 flex items-center">
              <strong className="mr-2">
                <img src={star} alt="" className="w-6" />
              </strong>
              <span
                className="mt-1 text-[#444444]"
                style={{ fontWeight: "600" }}
              >
                {roundedRating > 0 ? roundedRating : `No ratings yet`}
              </span>
            </li>
          </ul>
          <div className="text-center">
            <button
              onClick={handleEditClick}
              className="py-[10px] px-[16px] rounded-[8px] border border-blue-700
              w-[116px] bg-blue-500 hover:bg-blue-600 font-medium text-white
              transition-all duration-300 ease-out"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
