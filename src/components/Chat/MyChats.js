import React, { useEffect } from "react";
import MyChatCard from "./MyChatCard";
import { useContext } from "react";
import ChatContext from "../../context/chat/ChatContext";


const MyChats = () => {

    const { allChats, setSelectedChat } = useContext(ChatContext);
    useEffect(() => {
        // setSelectedChat(null);
        return () => {
            setSelectedChat(null)
        }
        // eslint-disable-next-line
    }, [allChats])

    return (
        <div>
            {allChats.length === 0 ?
                (
                    <div>
                        <p>No Chats available</p>
                    </div>
                ) :
                // sold + unsold items dono bhejenge
                // with different props
                // and accordingly, map all of them to the cards
                <div className="">
                    <div className="">
                        <div className="">
                            {
                                // unsold items
                                allChats.map((chat) => (
                                    <MyChatCard key={chat._id}
                                        chatDetails={chat}
                                    />
                                ))
                            }

                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default MyChats;