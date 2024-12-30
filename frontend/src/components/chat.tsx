import { useEffect, useState } from "react";
import { RemoveChat } from "../api/chats";
import { getUserByPhone } from "../api/users";
import "../styles/chat.css"
import { useNavigate, useLocation, useParams } from "react-router-dom";
interface ChatProps {
    chatId: string
    chatName: string;
    message: string;
    time: string;
    profileImage: string;
    userId: string;
}

export default function Chat({ chatId, chatName, message, time, profileImage, userId }: ChatProps) {
    const navigate = useNavigate();
    const pathname = useLocation().pathname.split("/");
    const [userToChat, setUserToChat] = useState<string | null>(null);
    const [resolvedChatName, setResolvedChatName] = useState<string>(chatName);
    const  myId  = useParams().userId;  
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
      }, [chatName, message, userId]);
    

      const RemoveItem = async () => {
        if (confirm("Are you sure you want to remove this chat?")) {
            try {
                const response = await RemoveChat(chatId);
               
            } catch (error) {
                console.error("Error removing chat:", error);
            }
        }
    };
    // useEffect(() => {
    // userByPhone();
    // });

    
    return (
        <div id="chatContainer" onClick={() => { navigate(`/app/${pathname[2]}/chat/${chatId}`, { relative: "path" }) }}>
            <div id="profileImage">
                <img src={profileImage} alt="User Profile" id="profileImage" />
            </div>
            <div id="showUser">
                <p id="chatName">{userToChat && userToChat[0].username}</p>
                <p id="message">{userToChat && userToChat[0].phone}</p>
            </div>
            <div
                id="removeChatIcon"
                onClick={(e) => {
                    e.stopPropagation();
                    RemoveItem();
                }}
            >
                <img src="/public/remove.svg" alt="Remove Chat" />
            </div>
        </div>
    );
}
