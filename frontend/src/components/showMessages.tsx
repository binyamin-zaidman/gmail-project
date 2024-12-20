import { useEffect, useRef, useState } from "react";
import { getAllMessages, messege, sendMessege } from "../api/messege";
import "../styles/showMessages.css";
import MessageComponent from "./message";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:3000");

export default function ShowAllMessages() {
    const [allMessages, setAllMessages] = useState<messege[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const { chatId, userId } = useParams<{ chatId: string; userId: string }>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    useEffect(() => {
        if (!chatId || !userId) {
            setError("Missing chatId or userId");
            return;
        }

        // מאזין להודעות חדשות מהשרת
        socket.on("newMessage", (message) => {
            if (message.chat_id === parseInt(chatId)) { // בדיקה אם ההודעה שייכת לצ'אט הנוכחי
                setAllMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        // הבאת כל ההודעות מהשרת
        const fetchMessages = async () => {
            try {
                const messages = await getAllMessages(chatId, userId);
                setAllMessages(messages);
                scrollToBottom();
            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("Failed to fetch messages.");
            }
        };

        fetchMessages();
        const handleNewMessage = (message: messege) => {
            if (message.chat_id === parseInt(chatId)) {
                setAllMessages((prevMessages) => [...prevMessages, message]);
                scrollToBottom();
            }
        };

        socket.off("newMessage");
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [chatId, userId]);

    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    // שליחת הודעה חדשה
    const sendMessage = async (messageContent: string) => {
        if (!messageContent.trim()) return;

        if (!chatId || !userId) {
            setError("Missing chatId or userId");
            return;
        }

        const messageObject: messege = {
            chat_id: parseInt(chatId), // ממירים את chatId למספר
            message: messageContent,
            sender_id: userId,
            timestamp: new Date().toISOString(),
            read: false,
        };

        try {
            // שליחת ההודעה לשרת לשמירה ב-DB
            await sendMessege(messageObject);

            // שליחת ההודעה לכל המשתמשים המחוברים
            socket.emit("sendMessage", messageObject);

            // הוספת ההודעה לרשימה
            // setAllMessages((prevMessages) => [...prevMessages, messageObject]);

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div id="messagesContainer">
            <div id="details">
                <img
                    src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                    alt="Profile"
                />
                <h3>Chat Details</h3>
            </div>
            <div id="allMessages">
                {error && <div className="error">{error}</div>}
                {allMessages.map((message, index) => (
                    <MessageComponent
                        key={index}
                        isCurrentUser={message.sender_id === userId}
                        userName={message.sender_id || "Unknown"}
                        content={message.message}
                        time={new Date(message.timestamp).toLocaleTimeString()}

                    />
                ))}
                <div ref={messagesEndRef} />
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
                    src="/public/send-message.png"
                    alt="send"
                    onClick={() => sendMessage(newMessage)}
                />
            </div>
        </div>
    );
}
