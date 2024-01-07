import React, { useState } from "react";

const StarRating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
    onRatingChange(clickedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-3xl cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => handleStarClick(star)}
          style={{ marginRight: "0.25rem" }} // Add margin between stars
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
