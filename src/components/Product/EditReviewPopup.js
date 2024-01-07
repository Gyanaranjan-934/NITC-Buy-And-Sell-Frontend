import React, { useState, useEffect } from "react";
import StarRating from "../Utils/StarRating";
import { useContext } from "react";
import ProductContext from "../../context/product/ProductContext";
import toast from "react-hot-toast";

const EditReviewPopup = ({ product, onClose }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { updateProductReview } = useContext(ProductContext);
  const [reviewDetails, setReviewDetails] = useState({
    // values hard coded for now. Will take prop values later
    rating: product.review.rating,
    review: product.review.review,
  });
  useEffect(() => {
    // Use a setTimeout to delay the appearance of the popup
    const timeout = setTimeout(() => {
      setIsPopupVisible(true);
    }, 300); // Adjust the delay time (in milliseconds) as needed

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);
  const handleClose = () => {
    // Removed timout here as it was causing bugs
    setIsPopupVisible(false);
    // Delay the closing of the popup to allow the animation to complete
    onClose(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Will be modified later during merging
    // Simply closes popup for now
    setIsPopupVisible(false);
    updateProductReview({
      id: product._id,
      rating: reviewDetails.rating,
      review: reviewDetails.review
    })
    toast.success("Edited successfully")

    // Delay the closing of the popup to allow the animation to complete
    onClose(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewDetails({
      ...reviewDetails,
      [name]: value,
    });
  };

  return (
    <div
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isPopupVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      {/* Create a centered square popup */}
      <div
        className={`bg-white rounded-lg shadow-md w-[80%] sm:w-[400px] h-[60%] sm:h-auto overflow-y-auto p-8 px-8 text-center z-10 transform transition-transform ease-in duration-500 ${isPopupVisible ? "scale-100" : "scale-90"
          }`}
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">Review your purchase</h2>

        {/* container to show all the details */}
        <div className="flex flex-col justify-between h-full">
          {/* top details div */}
          <form className="flex flex-col h-full text-left ml-2 mt-4">
            
            <label className="block mb-4">
              <strong>Rating:</strong>
              <StarRating
                initialRating={reviewDetails.rating}
                onRatingChange={(newRating) =>
                  setReviewDetails({ ...reviewDetails, rating: newRating })
                }
              />
            </label>
            <label className="mb-4">
              <strong>Description:</strong>
              <br />
              <textarea
                name="review"
                value={reviewDetails.review}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full mb-2"
              />
            </label>

            {/* buttons */}
            <div className="flex gap-x-5 justify-center">
              <button
                onClick={handleSubmit}
                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                transition-all duration-300 ease-out"
                type="submit"
              >
                Submit
              </button>
              <button
                onClick={handleClose}
                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                transition-all duration-300 ease-out"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReviewPopup;
