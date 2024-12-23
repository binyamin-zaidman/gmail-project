import { useEffect, useRef, useState } from "react";
import { getAllMessages, messege, sendMessege } from "../api/messege";
import "../styles/showMessages.css";
import MessageComponent from "./message";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useBackground } from "./BackgroundContext";


const socket = io("http://localhost:3000");

export default function ShowAllMessages() {
    const { backgroundColor } = useBackground();
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
            if (message.chat_id === chatId) { // בדיקה אם ההודעה שייכת לצ'אט הנוכחי
                // setAllMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        // הבאת כל ההודעות מהשרת
        const fetchMessages = async () => {
            try {

                const messages = await getAllMessages(chatId, userId);
                setAllMessages((prevMessages) => {
                    const newMessages = messages.filter(
                        (msg) => !prevMessages.some((prevMsg) => prevMsg.message_time === msg.message_time)
                    );
                    return [...prevMessages, ...newMessages];
                });
                scrollToBottom();

            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("Failed to fetch messages.");
            }
        };

        fetchMessages();
        const handleNewMessage = (message: messege) => {
            if (message.chat_id === parseInt(chatId)) {
                setAllMessages((prevMessages) => {
                    if (prevMessages.some((msg) => msg.message_time === message.message_time)) {
                        return prevMessages;
                    }
                    return [...prevMessages, message];
                });
                scrollToBottom();
            }
        };

        socket.off("newMessage", handleNewMessage);
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
            message_time: new Date().toISOString(),
            is_read: false,
            sender_name: "User", // צריך לשנות לשם משתמש שמחובר
        };

        try {
            // שליחת ההודעה לשרת לשמירה ב-DB
            const { sender_name } = await sendMessege(messageObject);

            // שליחת ההודעה לכל המשתמשים המחוברים
            socket.emit("sendMessage", { ...messageObject, sender_name });

            // הוספת ההודעה לרשימה
            setAllMessages((prevMessages) => [...prevMessages, { ...messageObject, sender_name }]);

            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(newMessage);
        }
    };


    return (
        <div id="messagesContainer">
            <div id="details">
                <img
                    src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                    alt="Profile"
                />
                <h3>{allMessages[allMessages.length - 1]?.chat_name}</h3>
            </div>
            <div id="allMessages" style={{ backgroundColor }}>
                {error && <div className="error">{error}</div>}

                {allMessages.map((message, index) => (
                    // index === allMessages.length - 1 && console.log(message),
                    <MessageComponent
                        key={index}
                        isCurrentUser={message.sender_id == userId}
                        userName={message.sender_name || "Unknown"}
                        content={message.message}
                        time={new Date(message.message_time).toLocaleString()}

                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div id="sendMessage">
                <div id="inputContainer">
                    <textarea
                        placeholder="Write a message..."
                        // type="textarea"
                        name="sendMessage"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown} //? לעדכן משתמשים שיוזר מקליד
                        rows={1}
                    />
                </div>
                <div id="sendContainer">
                    <img
                        id="sendIcon"
                        src="/public/send-message.png"
                        alt="send"
                        onClick={() => sendMessage(newMessage)}
                    />
                </div>
            </div>
        </div>
    );
}
