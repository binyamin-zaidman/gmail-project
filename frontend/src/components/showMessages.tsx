import { useEffect, useState } from "react"
import { getAllMessages } from "../api/messege"
import "../styles/showMessages.css"
import MessageComponent from "./message"
export default function ShowAllMessages({chat_id}: {chat_id:number}) {
    const [allMessages, setAllMessages] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messages = await getAllMessages(chat_id);
                setAllMessages(messages);
                console.log(messages);
                
            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("Failed to fetch messages.");
            }
        };

        fetchMessages();
    }, []);
    return (
        <div id="messagesContainer">
            <div id="details">
                <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="Profile" />
                <h3>Chat Details</h3>
            </div>
            <div id="allMessages">
                {error && <div className="error">{error}</div>}
                {allMessages.map((message: any, index: number) => (
                    <MessageComponent
                        key={index}
                        isCurrentUser={message.sender}
                        userName={message.userName}
                        content={message.message}
                        time={message.timestamp}
                    />
                ))}
            </div>
            <div id="sendMessage">
                <input placeholder="Write a message..." type="text" name="sendMessage" />
                <img src="../public/send-message.png" alt="" />
            </div>
        </div>
    );
}