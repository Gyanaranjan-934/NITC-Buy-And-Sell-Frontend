import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ChatContext from "../../context/chat/ChatContext";
import AuthContext from "../../context/auth/AuthContext";


const MyChatCard = ({chatDetails}) => {
    // in starting, this above useState variable will be false
    // and so, the chatbox will not be shown thill that is false
    // now, on click of a chatitem, the variable will be true, and as it is true,
    // the chatbox will be visible
    const [receiver, setReceiver] = useState({
        avatar: "#",
        name: "",
        latestMessage: "",
    });
    
    const { user } = useContext(AuthContext)
    const { 
        setIsPopupVisible,
        setChatId,
        chatId,
        setSelectedChat,
        selectedChat,
    } = useContext(ChatContext);
    useEffect(() => {
        // decides who will be the receiver of the chat
        if (chatDetails.users[0]._id === user) {
            setReceiver(chatDetails.users[1])
        }
        else {
            setReceiver(chatDetails.users[0])
            
        }

    }, [selectedChat,chatDetails,user])


    const clickHandler = async() => {
        setIsPopupVisible(true);
        setChatId(chatDetails._id);   
        setSelectedChat(chatDetails._id);
    }

    return (
        // className={`m-2 p-3 rounded-md max-w-[70%] 
        // ${message.user_id === "m210662ca" ? "bg-[#007bff] 
        // text-white self-end" : "bg-[#f0f0f0] text-[#333] self-start"}`}
        <div className={`"h-min p-4 flex space-x-2 gap-1 border-2 rounded-lg items-center cursor-pointer hover:bg-[#f0f0f0] transition-all duration-300 ease-out" ${chatId === chatDetails._id ? "bg-blue-300" : "bg-white"}`}
            onClick={clickHandler}>

            <div className="">
                <img src={receiver?.avatar ? receiver?.avatar : "#"} alt={receiver?.fullName} className="rounded-full h-[40px] w-[40px] overflow-hidden" />
            </div>
            <div className="">
                <strong className="whitespace-nowrap">{receiver?.fullName}</strong>
                <p className="text-sm">{chatDetails?.latestMessage?.messageBody}</p>
            </div>

        </div>
    )
}

export default MyChatCard;