import { useState } from "react";
import "../styles/message.css"
import { removeMessege } from "../api/messege";


export default function MessageComponent({ isCurrentUser, userName, content, time, isDeleted, messageId }: { isCurrentUser: boolean, userName: string, content: string, time: string, isDeleted: boolean, messageId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const HandleOptions = () => {
        if (isOpen) { setIsOpen(false) }
        else { setIsOpen(true) }
    };

    const HandleDelete = async () => {
        if (isDeleted) { setIsOpen(true) }
        else {await removeMessege(String(messageId)); setIsOpen(false) }
    }
    return (
        <div id="messageContainer" >
            <div className="message"  onMouseLeave={HandleOptions} id={`${isCurrentUser ? "currentUserMessage" : "otherUserMessage"}`}>
            <img onClick={HandleDelete} className={isOpen ? "shownOptions" : "hiddenOptions"} id="DeleteItem" src="/public/chat_14359821.png" alt="deleteItem" />
                <div id="myProfile">
                    <img src="/public/simpleProfile.jpg" alt="profile" />
                    <h3>{isCurrentUser ? "You" : userName}</h3>
                </div>
                <div id="messageBody">
                    <div className="content">{isDeleted ? "This message has been missed" : content}</div>
                    <p className="time">{time}</p>
                </div>
            </div>
        </div>
    );
}
