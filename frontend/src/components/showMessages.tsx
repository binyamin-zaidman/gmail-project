import { useEffect, useRef, useState } from "react";
import { getAllMessages, messege, sendMessege } from "../api/messege";
import "../styles/showMessages.css";
import MessageComponent from "./message";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useBackground } from "./BackgroundContext";
import { useVisibilityMeassage } from "./VisibilityMEssage";
import EmojiPicker from "emoji-picker-react";

const socket = io("http://localhost:3000");

export default function ShowAllMessages() {
    const { backgroundColor } = useBackground();
    const [allMessages, setAllMessages] = useState<messege[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { chatId, userId } = useParams<{ chatId: string; userId: string }>();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { isVisibleMeassage } = useVisibilityMeassage();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const addEmoji = (emoji: any) => {
        if (textAreaRef.current && emoji) {  // Ensure emoji is defined
            const textArea = textAreaRef.current;
            const startPos = textArea.selectionStart;
            // const endPos = textArea.selectionEnd;

            // הוספת האימוג'י למיקום הסמן
            const updatedText =
                text.substring(0, startPos) +
                emoji.emoji

            setText(updatedText);
            // העברת הסמן למיקום הנכון לאחר האימוג'י
            setTimeout(() => {
                textArea.setSelectionRange(
                    startPos + emoji.emoji.length,
                    startPos + emoji.emoji.length
                );
                textArea.focus();
            }, 0);
        }
    };


    useEffect(() => {
        if (!chatId || !userId) return;

        const fetchMessages = async () => {
            try {
                const messages = await getAllMessages(chatId, userId);

                setAllMessages((prevMessages) => {
                    const newMessages = messages.filter(
                        (msg) => !prevMessages.some((prevMsg) => prevMsg.message_time === msg.message_time)
                    );
                    return newMessages;
                });
            } catch (error) {
                console.error("Error fetching messages:", error);
                setError("Failed to fetch messages.");
            }
        };

        const handleNewMessage = (message: messege) => {
            if (message.chat_id === chatId) {
                setAllMessages((prevMessages) => {
                    if (prevMessages.some((msg) => msg.message_time === message.message_time)) {
                        return prevMessages;
                    }
                    return [...prevMessages, message];
                });
                scrollToBottom();
            }
        };

        fetchMessages();
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [chatId, userId]);

    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    const sendMessage = async () => {
        if (!text.trim()) return;

        if (!chatId || !userId) {
            setError("Missing chatId or userId in send message");
            return;
        }

        const messageObject: messege = {
            chat_id: chatId,
            message: text,
            sender_id: userId,
            message_time: new Date().toISOString(),
            is_read: false,
            sender_name: "User",
            is_deleted: false,
        };

        try {
            const { sender_name } = await sendMessege(messageObject);
            socket.emit("sendMessage", { ...messageObject, sender_name });
            setAllMessages((prevMessages) => [...prevMessages, { ...messageObject, sender_name }]);
            setText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const getChatName = () => {
        const otherUser = allMessages.find((msg) => msg.sender_id !== userId);
        return otherUser?.sender_name || allMessages[0]?.chat_name || "Unknown Chat";
    };



    console.log(allMessages);

    return (
        <div id="messagesContainer" className={isVisibleMeassage ? "visibleMessagesContainer" : "hiddenMessagesContainer"}>
            <div id="details">
                <img
                    src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                    alt="Profile"
                />
                <h3>{getChatName()}</h3>
            </div>
            <div id="allMessages" style={{ backgroundColor }}>
                {error && <div className="error">{error}</div>}
                {allMessages.map((message, index) => (
                    <MessageComponent
                        key={index}
                        isCurrentUser={message.sender_id == userId}
                        userName={message.sender_name || "Unknown"}
                        content={message.message || "No message"}
                        time={new Date(message.message_time).toLocaleString()}
                        isDeleted={message.is_deleted}
                        messageId={message.message_id}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div id="sendMessage">
                <div id="inputContainer">
                    <textarea
                        placeholder="Write a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                        ref={textAreaRef}
                    />
                    <button id="emojiButton" onClick={() => setShowEmojiPicker((prev) => !prev)}>😊</button>
                    {showEmojiPicker && (
                        <div style={{ position: "absolute", bottom: "60px", right: "15px" }}>
                            <EmojiPicker onEmojiClick={addEmoji} />
                        </div>
                    )}
                </div>
                <div id="sendContainer">
                    <img
                        id="sendIcon"
                        src="/public/send-message.png"
                        alt="send"
                        onClick={sendMessage}
                    />
                </div>
            </div>
        </div>
    );
}
