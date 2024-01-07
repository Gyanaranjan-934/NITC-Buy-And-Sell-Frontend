import React, { useState, useEffect } from "react";
import ItemReviewDetails from "./ItemReviewDetails";

const ItemReviewPopup = ({ product, onClose }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  useEffect(() => {
    // Use a setTimeout to delay the appearance of the popup
    const timeout = setTimeout(() => {
      setIsPopupVisible(true);
    }, 300); // Adjust the delay time (in milliseconds) as needed

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);
  const handleClose = () => {
    setIsPopupVisible(false);
    // Delay the closing of the popup to allow the animation to complete
    setTimeout(() => {
      onClose();
    }, 300); // Adjust the delay time to match your transition duration
  };
  // eslint-disable-next-line
  const handleSubmit = () => {
    // Will be modified later during merging
    // Simply closes popup for now
    setIsPopupVisible(false);
    // Delay the closing of the popup to allow the animation to complete
    onClose(0);
  };

  return (
    <div
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${
        isPopupVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Create a centered square popup */}
      <div
        className={`bg-white rounded-lg shadow-md w-[80%] sm:w-[400px] h-[60%] sm:h-auto overflow-y-auto p-8 px-8 text-center z-10 transform transition-transform ease-in duration-500 ${
          isPopupVisible ? "scale-100" : "scale-90"
        }`}
      >
        {/* container to show all the details */}
        <div className="flex flex-col justify-between h-full items-center">
          {/* top details div */}
          <ItemReviewDetails product={product} />
          <button
            onClick={handleClose}
            className="mt-6 border border-blue-700 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none
            transition-all duration-300 ease-out w-[116px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemReviewPopup;
