import React, { useState, useEffect, useContext, useRef } from "react";
import ChatContext from "../../context/chat/ChatContext";
import AuthContext from "../../context/auth/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import io from 'socket.io-client';


const ChatBox = () => {
    const {
        selectedChat,
        setAllMessages,
    } = useContext(ChatContext);

    const scrollToBottom = () => {
        try {
            setTimeout(() => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
                }
            }, 0);
        } catch (error) {
            // Handle any potential errors here
            console.error("Error while scrolling:", error);
        }
    };



    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loadingMessages, setLoadingMessages] = useState(true); // Added loading state
    const [messageSending, setMessageSending] = useState(false);
    const messagesEndRef = useRef(null); // Ref for scrolling to the end
    const socket = io('https://nitc-buysell-backend-rest-api.onrender.com'); // Connect to the server
    const host = process.env.REACT_APP_SERVER_URI
    useEffect(() => {
        const getMessageFunction = async () => {
            let token = sessionStorage.getItem("NITCBuySellUserAccessToken");
            if (token) {
                token = token?.substring(1, token.length - 1);
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            };
            
            try {
                if(selectedChat===null)return;
                const response = await axios.get(`${host}/chats/get-messages/${selectedChat}`,config)
                setAllMessages(response?.data?.data);
                setMessages(response?.data?.data);
                setLoadingMessages(false); // Set loading to false when messages are loaded
                scrollToBottom(); // Scroll to the end after loading
            } catch (error) {
                console.error(error);
            }
        }
        socket.on('chat message', (message) => {
            // Add the received message to your state
            getMessageFunction()
            setMessages((prevMessages) => [...prevMessages, message]);
            setMessageSending(false);
            scrollToBottom(); // Scroll to the end when receiving a message
        });

        getMessageFunction()
        setLoadingMessages(false);
        return () => {
            // Disconnect the socket when the component unmounts
            socket.disconnect();
        };
        // eslint-disable-next-line
    }, [selectedChat]);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);
    };

    const sendMessage = async (event) => {

        event.preventDefault();
        try {
            let token = sessionStorage.getItem("NITCBuySellUserAccessToken");
            if (token) {
                token = token?.substring(1, token.length - 1);
            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            };
            setMessageSending(true);
            const newmessage = newMessage;
            setNewMessage("");
            const response = await axios.post(
                `${host}/chats/send-message/${selectedChat}`,
                {
                    messageBody: newmessage,
                },
                config
            );
            // Emit the message to the server
            socket.emit('chat message', response.data);
            // setMessages((prevMessages) => [...prevMessages, data]);
            // setMessages([...messages, data]);
            scrollToBottom(); // Scroll to the end after sending a message
            setMessageSending(false);
        } catch (error) {
            toast.error("Failed to send message");
        }
    };

    return (
        <>
            {selectedChat ? (
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex flex-col overflow-y-auto">
                        {/* Show a spinner while loading messages */}
                        {loadingMessages ? (
                            <div className="flex items-center justify-center h-full">
                                <h1>Loading messages...</h1>
                            </div>
                        ) : messages.map((message) => (
                            <div
                                key={message._id}
                                className={`m-2 p-3 rounded-md max-w-[70%] ${message.sender?._id === user
                                    ? "bg-[#007bff] text-white self-end"
                                    : "bg-[#f0f0f0] text-[#333] self-start"
                                    }`}
                            >
                                {message.messageBody}
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div> {/* Ref for scrolling */}
                    </div>
                    <form onSubmit={sendMessage}>
                        <div className="bg-[#fff] border-t-[1px] border-solid border-[#e0e0e0] flex p-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={typingHandler}
                                className="flex-grow border border-solid rounded-md p-2 mr-2"
                            />
                            <button
                                className="bg-blue-500 border border-blue-700 hover:bg-blue-600 text-white rounded-md px-[16px] py-[8px] ml-2
                transition-all duration-300 ease-in-out"
                                type="submit"

                            >
                                {!messageSending ? "Send" : "Sending..."}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <h1>Please select a chat to message</h1>
                </div>
            )}
        </>
    );
};

export default ChatBox;
