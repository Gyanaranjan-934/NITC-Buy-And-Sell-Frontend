import React,{useEffect,useContext} from "react";
import MyBoughtItemsCollection from "../components/Product/MyBoughtItemsCollection";
import ProductContext from "../context/product/ProductContext";

const Bought = () => {
    const {getBoughtItems} = useContext(ProductContext)
    useEffect(() => {
        getBoughtItems()
        // eslint-disable-next-line
      }, [])

    return (

        <div>
            {/* is page pr hum apni upload ki hui items show karenge */}
            {/* isme dono include hongi-->> sold wali + unslod wali */}
            <MyBoughtItemsCollection />
        </div>

    )
}

export default Bought; 