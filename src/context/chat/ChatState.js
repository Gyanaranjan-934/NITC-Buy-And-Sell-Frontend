import React, { useState } from 'react'
import ChatContext from './ChatContext'
import axios from 'axios'

const ChatState = (props) => {

    const [allChats, setAllChats] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [chatId, setChatId] = useState(null);
    const host = process.env.REACT_APP_SERVER_URI
    let token = sessionStorage.getItem("NITCBuySellUserAccessToken");
    if (token) {
        token = token.substring(1, token.length - 1);
    }
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    const createNewChat = async (receiverId) => {
        try {
            const chat = await axios.post(`${host}/chats/create-chat`,{id: receiverId},config);
            getAllChats();
            return chat?.data
        } catch (error) {
            console.error(error)
        }
    }
    const getAllChats = async() =>{
        try {
            const chats  = await axios.get(`${host}/chats/get-chats`,config);
            setAllChats(chats.data.data);
        } catch (error) {
            console.error(error)
        }
    }
    
    return (<ChatContext.Provider value={{
        allChats,
        setAllChats,
        selectedChat,
        setSelectedChat,
        getAllChats,
        isPopupVisible,
        setIsPopupVisible,
        chatId,
        setChatId,
        allMessages,
        setAllMessages,
        createNewChat,
    }}>
        {props.children}
    </ChatContext.Provider>)
}

export default ChatState