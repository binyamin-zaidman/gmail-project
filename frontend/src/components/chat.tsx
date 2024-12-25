import { RemoveChat } from "../api/chats";
import "../styles/chat.css"
import { useNavigate, useLocation } from "react-router-dom";
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

    const RemoveItem = async () => {
        try {
            const response = await RemoveChat(chatId);
            console.log(response);
        } catch (error) {
            console.error("Error removing chat:", error);
        }
    }
    return (
        <div id="chatContainer" onClick={() => { navigate(`/app/${pathname[2]}/chat/${chatId}`, { relative: "path" }) }}>
            <div id="profileImage">
                <img src={profileImage} alt="User Profile" id="profileImage" />
            </div>
            <div id="showUser">
                <p id="chatName">{userId === pathname[2] ? chatName : "chatName"}</p>
                <p id="message">{chatName}</p>
            </div>
            <div id="removeChatIcon" onClick={RemoveItem}>
                <img src="/public/remove.svg" alt="" />
            </div>
        </div>
    );
}
