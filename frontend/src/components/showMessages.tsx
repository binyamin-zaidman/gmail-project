import { useEffect, useState } from "react";
import { getAllMessages, messege } from "../api/messege";
import "../styles/showMessages.css";
import MessageComponent from "./message";
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";

const socket = io("http://localhost:3000");

export default function ShowAllMessages() {
    const [allMessages, setAllMessages] = useState<messege[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const chatId = useParams().chatId;
    const userId = useParams().userId;

    useEffect(() => {
        // מאזין להודעות חדשות מהשרת ומוסיף אותן לרשימת ההודעות
        socket.on("newMessage", (message) => {
            setAllMessages((prevMessages) => [...prevMessages, message]);
        });

        // פונקציה שמביאה את כל ההודעות מהשרת
        const fetchMessages = async () => {
            try {
                if (chatId && userId){
                const messages = await getAllMessages(userId,chatId);
                console.log({ messages });
                setAllMessages(messages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("Failed to fetch messages.");
            }
        };

        fetchMessages();

        // ניקוי המאזין כאשר הרכיב מתנתק
        return () => {
            socket.off("newMessage");
        };
    }, [chatId]); 

    const sendMessage = (messageContent: string) => {
        console.log("Sending message:", messageContent);

        socket.emit("sendMessage", { chatId, message: messageContent });
        setNewMessage("");
    };

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
                <input
                    placeholder="Write a message..."
                    type="text"
                    name="sendMessage"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <img
                    src="../public/send-message.png"
                    alt="send"
                    onClick={() => sendMessage(newMessage)}
                />
            </div>
        </div>
    );
}
