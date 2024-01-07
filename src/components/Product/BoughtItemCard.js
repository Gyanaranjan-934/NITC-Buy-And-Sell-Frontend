import React, { useState } from "react";
import BoughtItemPopup from "./BoughtItemPopup";
import "../../css/boughItemCard.css";

const BoughtItemCard = ({
  product
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="w-[350px] sm:w-[580px] md:w-[740px] lg:w-[980px] h-min m-4 px-4 py-2 flex flex-row rounded-[10px] items-center justify-between shadow-lg bought-card">
      <div className="flex gap-x-3">
        <div className="flex items-center justify-center">
          <img
            src={product.images[0]}
            className="w-[80px] rounded-full aspect-square object-cover "
            alt={product.name}
          />
        </div>

        <div className="my-[10px] mx-[5px] max-w-[310px]">
          <div className="">
            <h4 className="text-[#1faa59] text-md font-bold">
              &#8377; {product.finalPrice}
            </h4>
            <h4 className="text-lg">{product.name}</h4>
            <h4 className="text-xs italic">{product.updatedAt}</h4>
          </div>
        </div>
      </div>

      <button
        className=" py-[6px] px-[20px] border border-blue-700 cursor-pointer
                rounded-md text-[12px] font-bold bg-blue-500 hover:bg-blue-600 text-white
                transition-all duration-300 ease-out"
        onClick={togglePopup}
      >
        View Details
      </button>

      {isPopupVisible && (
        <BoughtItemPopup
          key={product._id}
          product={product}
          onClose={togglePopup}
        />
      )}
    </div>
  );
};

export default BoughtItemCard;
