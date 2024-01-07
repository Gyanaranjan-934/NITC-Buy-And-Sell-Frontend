import React, { useContext, useEffect } from "react";
import MyItemCard from "./MyItemCard";
import ProductContext from "../../context/product/ProductContext";

const MyListItemsCollection = ({ searchParam }) => {
  const { getPostedItems,allPostedProducts } = useContext(ProductContext)
  const items = allPostedProducts
  useEffect(() => {
    getPostedItems();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className="flex justify-center m-full my-0 mx-auto">
      <div className="">
        {items.length === 0 ? (
          <div className="mt-12">
            <p>No items available</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center max-w-[1380px] my-0">
            {
              // unsold items
              items.map((item) => (
                <MyItemCard
                  key={item._id}
                  product={item}
                />
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListItemsCollection;
