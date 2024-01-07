import React,{useEffect,useContext} from "react";
import MyListItemsCollection from '../components/Product/MyListItemsCollection';
import ProductContext from "../context/product/ProductContext";
const MyList = () => {
  const {getPostedItems} = useContext(ProductContext)
    useEffect(() => {
      getPostedItems()
        // eslint-disable-next-line
      }, [])  

  return (
    <div className="">
        {/* is page pr hum apni upload ki hui items show karenge */}
        {/* isme dono include hongi-->> sold wali + unslod wali */}
        <MyListItemsCollection  />
    </div>
  );
};

export default MyList;
