import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatContext from "../../context/chat/ChatContext";

const ItemDetailsPopup = ({ product, onClose }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Use a setTimeout to delay the appearance of the popup
        const timeout = setTimeout(() => {
            setIsPopupVisible(true);
        }, 300); // Adjust the delay time (in milliseconds) as needed

        // Clean up the timeout when the component unmounts
        return () => clearTimeout(timeout);
    }, []);
    const handleClose = () => {
        setIsPopupVisible(false);

        // Delay the closing of the popup to allow the animation to complete
        setTimeout(() => {
            onClose();
        }, 300); // Adjust the delay time to match your transition duration
    };

    // take all the constrains to set the message state 
    const {
        createNewChat,
        setSelectedChat,
        setChatId,
    } = useContext(ChatContext)

    const handleMessageClick = async() => {
        
        const response = await createNewChat(product?.seller?._id);
        
        setChatId(response.data);
        setSelectedChat(response.data);
        
        navigate('/chatpage');
    }

    return (
        <div className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isPopupVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Create a centered square popup */}
            <div className={`bg-white rounded-lg shadow-md w-[90%] sm:w-[580px] h-min max-h-[600px]  p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isPopupVisible ? "scale-100" : "scale-90"}`}>
                {/* container to show all the details */}
                <div className="flex flex-col justify-between">

                    {/* top details div */}
                    <div className="flex flex-col sm:flex-row">

                        <img src={product.images[0]} alt={product.name} className="w-[300px] h-[300px] aspect-square object-cover  p-3" />
                        {/* name, price, seller */}
                        <div className="flex flex-col justify-end m-4 p-3 items-start">
                            <h4 className="text-[#1faa59] text-xl font-bold">&#8377; {product.price}</h4>
                            <h4 className="text-2xl">{product.name}</h4>
                            <p className="text-sm italic whitespace-nowrap">by <span className="italic text-gray-400 text-sm">{product.seller.fullName}</span></p>
                        </div>

                    </div>

                    {/* to store description and condition */}
                    <div className="flex flex-col items-start ml-4">
                        <p className="break-words text-left">
                            Description:&nbsp;
                            <span className="italic text-sm text-gray-500">
                                {product.description}
                            </span>
                        </p>
                        <p className="break-words text-left">
                            Condition:&nbsp;
                            <span className="italic text-sm text-gray-500">
                                {product.condition}
                            </span>
                        </p>
                    </div>

                    {/* buttons */}
                    <div className="flex gap-x-5 justify-center">
                        {/* Close button */}
                        <button
                            onClick={handleMessageClick}
                            className="border border-blue-700 bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none transition-all duration-300 ease-out"
                        >
                            Message
                        </button>


                        {/* Close button */}
                        <Link onClick={handleClose}
                            className="border border-blue-700 bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none
                            transition-all duration-300 ease-out"
                        >Close</Link>
                    </div>

                </div>



            </div>
        </div>
    );
};

export default ItemDetailsPopup;
