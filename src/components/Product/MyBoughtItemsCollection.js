import React, { useContext } from "react";
import BoughtItemCard from "./BoughtItemCard";
import ProductContext from "../../context/product/ProductContext";
import { useEffect } from "react";

const MyBoughtItemsCollection = ({ searchParam }) => {
  const { allBoughtProducts, getBoughtItems } = useContext(ProductContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBoughtItems();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);
  const boughtItems = allBoughtProducts
  return (
    <div className="flex justify-center max-w-[1380px] my-0 mx-auto">
      {boughtItems.length === 0 ? (
        <div className="mt-12">
          <p>No items Bought</p>
        </div>
      ) : (
        
        <div className="flex flex-col justify-center max-w-[1380px] my-0">
          {
            boughtItems.map((item) => (
              <BoughtItemCard
                key={item._id}
                product={item}
              />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default MyBoughtItemsCollection;
