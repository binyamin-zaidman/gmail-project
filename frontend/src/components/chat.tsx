import "../styles/chat.css"
import { useNavigate, useLocation, replace } from "react-router-dom";
interface ChatProps {
    chatId:string
    chatName: string;
    message: string;
    time: string;
    profileImage: string;
}

export default function Chat({chatId, chatName, message, time, profileImage }: ChatProps) {
    const navigate = useNavigate();
const pathname = useLocation().pathname.split("/");
    console.log({pathname});
    
    return (
        <div id="chatContainer" onClick={() => {navigate(`/app/${pathname[2]}/chat/${chatId}`, {relative :"path"})}}>
            <img src={profileImage} alt="User Profile" id="profileImage" />
            <div id="showUser">
                <p id="chatName">{chatName}</p>
                <p id="message">{message}</p>
            </div>
            <h4 id="time">{time}</h4>
        </div>
    );
}
