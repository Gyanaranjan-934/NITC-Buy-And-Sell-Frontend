import React, { useState, useEffect } from "react";
import StarRating from "../Utils/StarRating";
import { useContext } from "react";
import ProductContext from "../../context/product/ProductContext";
import toast from "react-hot-toast";

const BoughtItemReviewPopup = ({
  product,
  onClose,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { createReview, productReview } = useContext(ProductContext);
  const [reviewDetails, setReviewDetails] = useState({
    rating: 0,
    desc: "",
  });
  const [onDataUpload, setOnDataUpload] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPopupVisible(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [product]);
  const handleClose = () => {
    setIsPopupVisible(false);
    
    onClose();
    
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(productReview,reviewDetails);
    setOnDataUpload(true);
    const newReview = await createReview({
      id: product._id,
      rating: reviewDetails.rating,
      review: reviewDetails.desc
    });
    console.log(newReview);
    if (newReview?.data?.success) {
      toast.success(newReview?.data?.message);
    } else {
      toast.error("Error is creating review")
    }
    setOnDataUpload(false);
    setIsPopupVisible(false);
    onClose()
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
                name="desc"
                value={reviewDetails.desc}
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
              >
                {!onDataUpload ? "Submit" : "Creating Review"}
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

export default BoughtItemReviewPopup;
