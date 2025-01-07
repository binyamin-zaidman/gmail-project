import { useEffect, useState } from "react";
import { RemoveChat } from "../api/chats";
import { getUserByPhone } from "../api/users";
import "../styles/chat.css"
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useVisibility } from './VisibilityContext';
import { useVisibilityMeassage } from "./VisibilityMEssage";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

interface ChatProps {
    chatId: string
    chatName: string;
    message: string;
    time: string;
    profileImage: string;
    userId: string;
    isDeleted: boolean;
}

export default function Chat({ chatId, chatName, message, time, profileImage, userId ,isDeleted}: ChatProps) {
    const navigate = useNavigate();
    const pathname = useLocation().pathname.split("/");
    const [userToChat, setUserToChat] = useState<string | null>(null);
    const [resolvedChatName, setResolvedChatName] = useState<string>(chatName);
    const {setIsVisible } = useVisibility();
    const {setIsVisibleMeassage} = useVisibilityMeassage();
    const myId = useParams().userId;
    
    // const userByPhone = async () => {
        //     try {
            //         const user = await getUserByPhone(message);
            //         setUserToChat(user);
            //     } catch (error) {
                //         console.error(error, "get user by phone:");
                //     }
    // }

    useEffect(() => {
        const fetchChatName = async () => {
            if (myId == userId) {
                try {
                    const user = await getUserByPhone(chatName);

                    //   setResolvedChatName(user[0]);
                    setUserToChat(user);
                } catch (error) {
                    console.error("Error fetching user by phone:", error);
                }
            } else {
                try {
                    const user = await getUserByPhone(userId);
                    // setResolvedChatName(user.username || chatName);
                    setUserToChat(user);
                } catch (error) {
                    console.error("Error fetching user by ID:", error);
                }
            }
        };

        fetchChatName();
    }, [chatId, message, userId]);

    const RemoveItem = async () => {
        if (confirm("Are you sure you want to remove this chat?")) {
            try {
                const response = await RemoveChat(chatId);
                console.log("return from server",response);
                
                socket.emit("chatDeleted", chatId);
                navigate(`/app/${pathname[2]}`, { replace: true });
            } catch (error) {
                console.error("Error removing chat:", error);
            }
        }
    };
    // useEffect(() => {
    // userByPhone();
    // });
    
    return (
        <div id="chatContainer" onClick={() => {setIsVisible(false); setIsVisibleMeassage(true);  navigate(`/app/${pathname[2]}/chat/${chatId}`, { relative: "path" }) }}>
            <div id="profileImage">
                <img src={profileImage} alt="User Profile" id="profileImage" />
            </div>
            <div id="showUser">
                <p id="chatName">{userToChat && userToChat[0]?.username}</p>
                <p id="message">{userToChat && userToChat[0]?.phone}</p>
            </div>
            <div
                id="removeChatIcon"
                onClick={(e) => {
                    e.stopPropagation();
                    RemoveItem();
                }}
            >
                <img id="deleteChatIcon" src="/public/delete_forever_30dp_589DF4_FILL0_wght400_GRAD0_opsz24.svg" alt="Remove Chat" />
            </div>
        </div>
    );
}
