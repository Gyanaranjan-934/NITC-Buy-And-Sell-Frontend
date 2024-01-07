import { createContext, useState } from "react";


export const ChatContext = createContext();

export function ChatContextProvider({ children }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [chatId, setChatId] = useState(null);
    const Chats = [
        { chat_id: "1", sender_id: "m210694ca", receiver_id: "m210662ca", sender_name: "joel" },
        { chat_id: "2", sender_id: "m210676ca", receiver_id: "m210662ca", sender_name: "gyanaranjan" },
        { chat_id: "3", sender_id: "m210673ca", receiver_id: "m210662ca", sender_name: "Indrajeet" },
        { chat_id: "4", sender_id: "m210687ca", receiver_id: "m210662ca", sender_name: "Karan" },
        { chat_id: "5", sender_id: "m210694ca", receiver_id: "m210662ca", sender_name: "joel" },
        { chat_id: "6", sender_id: "m210676ca", receiver_id: "m210662ca", sender_name: "gyanaranjan" },
        { chat_id: "7", sender_id: "m210673ca", receiver_id: "m210662ca", sender_name: "Indrajeet" },
        { chat_id: "8", sender_id: "m210687ca", receiver_id: "m210662ca", sender_name: "Karan" },
        { chat_id: "9", sender_id: "m210694ca", receiver_id: "m210662ca", sender_name: "joel" },
        { chat_id: "10", sender_id: "m210676ca", receiver_id: "m210662ca", sender_name: "gyanaranjan" },
        { chat_id: "11", sender_id: "m210673ca", receiver_id: "m210662ca", sender_name: "Indrajeet" },
        { chat_id: "12", sender_id: "m210687ca", receiver_id: "m210662ca", sender_name: "Karan" },
    ];
    const Messages = [
        { content: "hi", chat_id: "1", user_id: "m210694ca" },
        { content: "hi", chat_id: "1", user_id: "m210662ca" },
        { content: "selling phone?", chat_id: "1", user_id: "m210694ca" },
        { content: "yes", chat_id: "1", user_id: "m210662ca" },
        { content: "how much?", chat_id: "1", user_id: "m210694ca" },
        { content: "10k", chat_id: "1", user_id: "m210662ca" },
        { content: "any discount?", chat_id: "1", user_id: "m210694ca" },
        { content: "9k last", chat_id: "1", user_id: "m210662ca" },
        { content: "ok, deal", chat_id: "1", user_id: "m210694ca" },
        { content: "deal.", chat_id: "1", user_id: "m210662ca" },
        { content: "i'm coming to take it.", chat_id: "1", user_id: "m210694ca" },
        { content: "take from oldmega", chat_id: "1", user_id: "m210662ca" },
        { content: "okay", chat_id: "1", user_id: "m210694ca" },
        { content: "okay", chat_id: "1", user_id: "m210662ca" },

    ];


    

    return <ChatContext.Provider value={{
        isPopupVisible,
        setIsPopupVisible,
        Chats,
        Messages,
        chatId,
        setChatId
    }} >
        {children}
    </ChatContext.Provider>
}