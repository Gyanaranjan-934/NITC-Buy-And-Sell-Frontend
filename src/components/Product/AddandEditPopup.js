import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import ProductContext from "../../context/product/ProductContext";

const AddandEditPopup = ({ product, onClose, }) => {

    // const [pic, setPic] = useState(); // Store the selected image file
    const {
        getCategories,
        allCategories,
        setAllCategories,
        createNewProduct,
        updateOldProduct,
    } = useContext(ProductContext)

    const [selectedImages, setSelectedImages] = useState([])
    const [dataUploading, setDataUploading] = useState(false);
    const [otherCategory, setOtherCategory] = useState("");
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState(product?product.condition:"");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const conditionMap = [
        {
            id: 1,
            name: 'Good'
        },
        {
            id: 2,
            name: 'Average'
        },
        {
            id: 3,
            name: 'Bad'
        }
    ]

    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible);
    };
    const selectCategory = (selectedCategory) => {
        setOptionsVisible(false)
        if (selectedCategory === "Other") {
            setShowOtherInput(true);
        } else {
            setShowOtherInput(false);
            setItemData((prev) => ({
                ...prev,
                category: selectedCategory,
            }));

        }
    };
    const handleOtherCategoryChange = (event) => {
        const { value } = event.target;

        setOtherCategory(value);


        setItemData((prev) => ({
            ...prev,
            category: value,
        }));
        setAllCategories([...allCategories, itemData.category]);
    };


    useEffect(() => {
        getCategories();
        const timeout = setTimeout(() => {
            setIsPopupVisible(true);
        }, 150);

        return () => {
            setSelectedImages([]);
            clearTimeout(timeout);
        }
        // eslint-disable-next-line
    }, []);

    const handleClose = () => {
        setIsPopupVisible(false);


        setTimeout(() => {
            onClose();
        }, 100);
    };


    const [itemData, setItemData] = useState({
        name: product ? product.name : "",
        category: product ? product.category : "",
        description: product ? product.description : "",
        price: product ? product.price : "",
        categories: allCategories,
        images: product ? product.images : [],
        buyer: "",
        finalPrice: 0,
        sold: false,
    });

    const changeHandler = (event, index) => {
        if (event.target.type === "file") {
            const file = event.target.files;
            if (file) {
                setSelectedImages((prevSelectedImages) => [...prevSelectedImages, file[0]]);
                // Use the callback form of setItemData to ensure you're working with the latest state
                setItemData((prev) => ({
                    ...prev,
                    images: [...selectedImages, file[0]],
                }));
            }
        } else {
            setItemData((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!itemData.name || !itemData.category || !itemData.description || !itemData.price || selectedCondition==="") {
            toast.error("Please enter all required fields correctly");
            return;
        }
        const uploadProduct = async () => {
            setDataUploading(true);
            const dataToUpload = itemData;
            dataToUpload.condition = selectedCondition;
            return await createNewProduct(dataToUpload)
                .then((res) => {
                    // Show a success message
                    setDataUploading(false);
                    if (res.success) {
                        toast.success("Product created successfully!");
                    }
                    // Close the popup
                    handleClose();
                })
                .catch((error) => {
                    setDataUploading(false);
                    toast.error(error?.response?.data?.message);
                });
        };

        uploadProduct();
    }

    const updateHandler = async (event) => {
        event.preventDefault();
        if (!itemData.name || !itemData.category || !itemData.description || itemData.condition==="" || !itemData.price) {
            toast.error("Please enter all required fields correctly");
            return;
        }
        const dataToUpdate = itemData
        dataToUpdate.id = product._id
        dataToUpdate.condition = selectedCondition;
        const uploadProduct = async () => {
            setDataUploading(true);
            const response = await updateOldProduct(dataToUpdate)
            if(response){
                setDataUploading(false);
                if(response.data.success){
                    toast.success(response.data.message);
                }else{
                    toast.error(response.data.message);
                }
            }
            handleClose();
        };

        await uploadProduct();
    }





    return (
        <div className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isPopupVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Create a centered square popup */}
            <div className={`bg-white rounded-lg shadow-md w-[90%] sm:w-[600px] md:w-[720px] h-min max-h-[600px]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isPopupVisible ? "scale-100" : "scale-90"}`}>
                {/* container to show all the details */}
                <form
                    // onSubmit={submitHandler}
                    encType="multipart/form-data"
                    className="flex flex-col"
                >

                    <label className="w-full flex items-center gap-x">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Item Name<sup className="text-rose-500">*</sup> :</p>
                        <input
                            type="text"
                            required
                            name="name"
                            onChange={changeHandler}
                            placeholder="Enter Item Name"
                            value={itemData.name}
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label>


                    <label className="w-full flex items-center gap-x" onClick={toggleOptions}>
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Category<sup className="text-rose-500">*</sup> :</p>
                        <div className="relative w-full">
                            <input
                                type="text"
                                required
                                name="category"
                                value={itemData?.category?.name}
                                placeholder="Select a category"
                                className="rounded-[0.5rem] w-full p-[12px]"
                                readOnly
                            />
                            {optionsVisible && (
                                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {allCategories.map((categoryOption) => (
                                        <div
                                            key={categoryOption._id}
                                            onClick={() => {
                                                selectCategory(categoryOption);
                                                toggleOptions();
                                            }}
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {categoryOption.name}
                                        </div>
                                    ))}
                                    <div // Add the "Other" option here
                                        onClick={() => {
                                            selectCategory("Other")
                                        }}
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                    >
                                        Other
                                    </div>
                                </div>
                            )}
                        </div>
                    </label>
                    {showOtherInput && (
                        <label className="w-full flex items-center">
                            <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Enter Other Category:</p>
                            <input
                                type="text"
                                required
                                name="category"
                                value={otherCategory}
                                onChange={handleOtherCategoryChange}
                                placeholder="Enter a new category"
                                className="rounded-[0.5rem] w-full p-[12px]"
                            />
                        </label>
                    )}


                    <label className="w-full flex items-center">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Description<sup className="text-rose-500">*</sup> :</p>
                        <textarea
                            name="description"
                            onChange={changeHandler}
                            placeholder="Type description here"
                            value={itemData.description}
                            rows={2}
                            cols={50}
                            className="rounded-[0.5rem]
                            w-full p-[12px]"
                        />
                    </label>

                    <label className="w-full flex items-center mt-3">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Condition<sup className="text-rose-500">*</sup> :</p>
                        <div className="relative w-full">
                        <input
                            type="text"
                            name="condition"
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                            placeholder="Describe current condition of item"
                            value={(product && selectedCondition==="")? product.condition :selectedCondition}
                            rows={2}
                            cols={50}
                            readOnly
                            className="rounded-[0.5rem] w-full p-[12px]"
                        />

                        {
                            dropdownVisible && (
                                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {conditionMap.map((condition) => (
                                        <div
                                            key={condition.id}
                                            onClick={() => {
                                                setSelectedCondition(condition.name);
                                            }}
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
                                            {condition.name}
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                        </div>
                    </label>

                    <label className="w-full flex items-center">
                        <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Price<sup className="text-rose-500">*</sup> :</p>
                        <input
                            type="number"
                            required
                            name="price"
                            onChange={changeHandler}
                            placeholder="Enter Item Price"
                            value={itemData.price}
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label>


                    {/* this will be added to image table */}
                    {/* <label className="w-full">
                        <input
                            type="file"
                            accept="image/*"
                            {...(id ? {} : { required: true })}
                            name="productImage"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            placeholder="choose image file"
                            className="rounded-[0.5rem] 
                        w-full p-[12px]"
                        />
                    </label> */}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <label key={index} className="w-full">
                            <input
                                type="file"
                                accept="image/*"
                                {...(!product && index === 1 ? "required" : {})}
                                name={`productImage${index}`}
                                onChange={changeHandler}
                                placeholder={`Choose image file ${index}`}
                                className="rounded-[0.5rem] w-full p-[12px]"
                            />
                        </label>
                    ))}


                    {/* this part will be visible only if the item is already present there,
                and this part will contain the details to be filled if the item is sold */}
                    {product && (
                        <div>
                            {/* horizontal rule */}
                            <div className="w-full h-1 bg-slate-200 mx-auto rounded-md"></div>
                            <div className="flex justify-start mt-2">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">
                                    <sup className="text-rose-500">*</sup>Fill only when item is sold<sup className="text-rose-500">*</sup>
                                </p>
                            </div>

                            <label className="w-full flex items-center">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Sold To: <sup className="text-rose-500">*</sup></p>
                                <input
                                    type="text"
                                    required
                                    name="buyer"
                                    onChange={changeHandler}
                                    placeholder="buyer_name/buyer_id"
                                    value={itemData.buyer}
                                    className="rounded-[0.5rem] 
                        w-full p-[12px]"
                                />
                            </label>
                            <label className="w-full flex items-center">
                                <p className="text-[0.875rem] mb-1 leading-[1.375rem] whitespace-nowrap">Final Price<sup className="text-rose-500">*</sup></p>
                                <input
                                    type="number"
                                    required
                                    name="finalPrice"
                                    onChange={changeHandler}
                                    placeholder="Enter Item Price"
                                    value={itemData.finalPrice}
                                    className="rounded-[0.5rem] 
                        w-full p-[12px]"
                                />
                            </label>
                        </div>
                    )}




                    {/* buttons */}

                    <div className="flex gap-x-5 justify-center">
                        {/* to add new product */}
                        {!product && (
                            <button onClick={submitHandler}
                                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                                type="submit"
                                {...(dataUploading ? "disabled" : {})}

                            >{dataUploading ? "Creating your product..." : "Add product"}</button>
                        )}
                        {product && (
                            <button onClick={updateHandler}
                                className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                                type="submit"
                                {...(dataUploading ? "disabled" : {})}
                            >{dataUploading ? "Updating your product..." : "Update product"}</button>
                        )
                        }


                        {/* Close button */}
                        <button onClick={handleClose}
                            className="border border-blue-700  bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-md focus:outline-none
                            transition-all duration-300 ease-out"
                        >Close</button>
                    </div>


                </form>







            </div>
        </div>
    );
};

export default AddandEditPopup;
