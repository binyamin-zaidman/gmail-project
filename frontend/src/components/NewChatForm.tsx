import "../styles/newChatForm.css";
import { useState, useEffect, useRef } from "react";

interface NewChatFormProps {
    addChat: (userToChat: string) => void;
    onClose: () => void;
}

export default function NewChatForm({ addChat, onClose }: NewChatFormProps) {
    const [userToChat, setUserToChat] = useState("");
    const formRef = useRef<HTMLDivElement>(null);

    const handleAddChat = () => {
        addChat(userToChat);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // הסר מאזין כדי למנוע זליגות זיכרון
        };
    }, [onClose]);

    return (
        <div id="newChatForm" ref={formRef}>
            <input
                type="text"
                placeholder="To start enter a phone number"
                value={userToChat}
                onChange={(e) => setUserToChat(e.target.value)}
            />
            <button onClick={handleAddChat}>Add Chat</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
