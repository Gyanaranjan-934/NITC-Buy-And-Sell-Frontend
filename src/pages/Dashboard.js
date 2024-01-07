import React, { useState, useEffect } from "react";
import DashboardItemCollection from "../components/Product/DashboardItemCollection";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth/AuthContext";
import ProductContext from "../context/product/ProductContext";

const Dashboard = () => {
  const { isAuthenticated, allProducts, allCategories } = useContext(AuthContext)
  const { getAllProducts, getCategories } = useContext(ProductContext)
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setSearchParam(e.target.value);
    // console.log(searchParam);
  };
  useEffect(() => {
    const getUserDataFunction = async() => {
      try {
        await getAllProducts()
        await getCategories()
      } catch (error) {
          console.error(error.response.data.message)
      }
      
    }
    if (isAuthenticated) {
      // console.log(userData);
      getUserDataFunction();
    } else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [allProducts,allCategories])
  return (
    <div className="w-full h-full flex flex-col items-center mt-6">
      {/* here import and use DashboardItemCollection component */}
      <div className="w-full flex flex-col items-center mb-[28px]">
        <input
          type="text"
          required
          value={searchParam}
          onChange={changeHandler}
          placeholder="Search Here..."
          name="search"
          className="rounded-[0.5rem]
                       p-[12px] border-2 text-[#777777] w-2/3 max-w-lg"
        />
      </div>
      <DashboardItemCollection searchParam={searchParam} />
    </div>
  );
};

export default Dashboard;
