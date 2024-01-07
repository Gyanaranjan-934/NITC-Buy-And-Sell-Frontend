import React, { useState } from "react";
import ProductContext from './ProductContext'
import axios from "axios";
import toast from "react-hot-toast";

const ProductState = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [allPostedProducts, setAllPostedProducts] = useState([]);
    const [allBoughtProducts, setAllBoughtProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null);
    const [productReview, setProductReview] = useState(null);
    const [picLoading, setPicLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [alert, setAlert] = useState(null);
    const host = process.env.REACT_APP_SERVER_URI
    
    let token = sessionStorage.getItem("NITCBuySellUserAccessToken");
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
    };

    const getAllProducts = async () => {
        
        const response = await axios.get(
            `${host}/products/get-products/`,
            config
        );
        
        if(response?.data?.success){
            setAllProducts(response.data?.data);
        }else{
            setAllProducts([]);
        }
    }

    const createNewProduct = async (itemData) => {
        
        let formdata = new FormData();
    
        // Append each property individually
        formdata.append('name', itemData.name);
        formdata.append('category', JSON.stringify(itemData.category));
        formdata.append('description', itemData.description);
        formdata.append('condition', itemData.condition);
        formdata.append('price', itemData.price);
        
    
        // Append each image separately
        itemData.images.forEach((image, index) => {
            formdata.append(`images`, image);
        });
    
        try {
            const { data } = await axios.post(
                `${host}/products/create-product`,
                formdata,
                config
            );
            
            getAllProducts();
            return data;
        } catch (error) {
            console.error(error);
            setPicLoading(false);
            toast.error(error.response.data.message);
        }
    };
    
    const getBoughtItems = async () => {
        try {
            const response = await axios.get(`${host}/products/get-bought-products`, config)
        
            setAllBoughtProducts(response.data?.data);
        } catch (error) {
            console.error(error);
            setAllBoughtProducts([])
        }
    }

    const getPostedItems = async () => {
        try {
            const response = await axios.get(`${host}/products/get-posted-products`, config)
            setAllPostedProducts(response.data?.data);
        } catch (error) {
            console.error(error);
            setAllPostedProducts([])
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`${host}/products/get-categories`,config)
            setAllCategories(response?.data?.data);
            
        } catch (error) {
            console.error('Error fetching categories', error);
            setAllCategories([])
        }

    }

    const getSellerDetails = async (id) => {
        try {
            const response = await axios.get(`/auth/fetch-user`, { email: id }, config);
            setSellerDetails(response)
        } catch (error) {
            console.error(error);
            setSellerDetails(null);
        }

    }

    const getReview = async (id) => {
        try {
            const response = await axios.get(`/rating/get-rating/${id}`, config);
            setProductReview(response.data)
        } catch (error) {
            console.error(error);
            setProductReview(null);
        }

    }

    const createReview = async (data) => {
        try {
            const response = await axios.post(`/reviews/create-review`, {
                id: data.id,
                rating: data.rating,
                review: data.review
            }, config)
            if (!response.ok) {
                // Handle non-successful response (e.g., 404 or 500)
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const updatedData = await response.json();
            setProductReview(updatedData)
            setAlert("Review saved successfully")
        } catch (error) {
            console.error(error);
        }

    }

    const updateProductReview = async (data) => {
        try {
            const response = await axios.put(`/reviews/update-review`, data, config)
            const updatedData = response.data
            setProductReview(updatedData)
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProductReview = async (id) => {
        try {
            const response = await axios.post(`/rating/delete-rating`,{id},config)
            if(response.success) {
                setProductReview(null)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateOldProduct = async (itemData) => {
        try {

            const { id, name, description, condition, price, category, images } = itemData;
    
            // Create FormData and append the data
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('condition', condition);
            formData.append('price', price);
            formData.append('category', category);
            if(itemData?.buyer.length>0 && !isNaN(Number.parseFloat(itemData?.finalPrice))){
                formData.append('buyer', itemData.buyer)
                formData.append("finalPrice", Number.parseFloat(itemData.finalPrice))
                formData.append("sold",true);
            }
    
            // Append each image file
            images.forEach((image) => {
                formData.append(`images`, image);
            });
    
            // Update the product using the axios.post method with FormData
            const response  = await axios.put(
                `${host}/products/update-product`,
                formData,
                config
            );
            setPicLoading(false);
            getPostedItems();

            return  response;
        } catch (error) {
            console.error(error);
            setPicLoading(false);
        }
    };
    

    
    return (
        <ProductContext.Provider value={{
            allProducts,
            getAllProducts,
            setAllProducts,
            getBoughtItems,
            getPostedItems,
            createNewProduct,
            getCategories,
            allCategories,
            setAllCategories,
            sellerDetails,
            productReview,
            setProductReview,
            alert,
            getSellerDetails,
            deleteProductReview,
            updateProductReview,
            createReview,
            getReview,
            picLoading,
            setPicLoading,
            selectedImage,
            setSelectedImage,
            updateOldProduct,
            allPostedProducts,
            setAllPostedProducts,
            allBoughtProducts,
            setAllBoughtProducts
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState