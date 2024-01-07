import React, { useState } from "react";
import AddandEditPopup from "./AddandEditPopup";
import ItemReviewPopup from "./ItemReviewPopup";
import "../../css/boughItemCard.css";

const MyItemCard = ({
  product
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isReviewPopupVisible, setIsReviewPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const toggleReviewPopup = () => {
    setIsReviewPopupVisible(!isReviewPopupVisible);
  };

  return (
    <div className="w-[350px] sm:w-[580px] md:w-[740px] lg:w-[980px] h-min m-4 px-4 py-2 flex flex-row rounded-[10px] items-center justify-between shadow-lg bought-card">
      <div className="flex gap-x-3">
        <div className="flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-[80px] rounded-full aspect-square object-cover "
          />
        </div>

        <div className="my-[10px] mx-[5px] max-w-[310px]">
          <div className="">
            <h4 className="text-[#1faa59] text-md font-bold">
              &#8377; {product?.sold ? product.finalPrice : product.price}
            </h4>
            <h4 className="text-lg">{product.name}</h4>
          </div>
          {!product.sold && (
            <div className="max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {product.description}
            </div>
          )}
          {product.sold && (
            <div className="max-w-[75px] overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {product?.buyer.name}
            </div>
          )}
        </div>
      </div>

      {/* first button to edit the item */}
      <div className=" flex flex-wrap justify-end items-center gap-3 sm-sc-btn">
        {!product.sold && (
          <button
            className=" py-[6px] px-[20px] border border-blue-700 cursor-pointer
                rounded-md text-[12px] font-bold bg-blue-500 hover:bg-blue-600 text-white
                transition-all duration-300 ease-out"
            onClick={togglePopup}
          >
            Edit Details
          </button>
        )}

        {product.sold && (
          <button
            className=" py-[6px] px-[20px] border border-blue-700
                rounded-md text-[12px] font-bold bg-blue-400 text-white
                pointer-events-none opacity-50 cursor-not-allowed"
            onClick={togglePopup}
          >
            SOLD
          </button>
        )}

        {product?.review && (
          <button
            className=" py-[6px] px-[20px] border border-blue-700 cursor-pointer
            rounded-md text-[12px] font-bold bg-blue-500 hover:bg-blue-600 text-white
            transition-all duration-300 ease-out"
            onClick={toggleReviewPopup}
          >
            View Review
          </button>
        )}
      </div>

      {isPopupVisible && (
        <AddandEditPopup
          product={product}
          onClose={togglePopup}
        />
      )}

      {isReviewPopupVisible && (
        <ItemReviewPopup
          product={product}
          onClose={toggleReviewPopup}
        />
      )}
    </div>
  );
};

export default MyItemCard;
