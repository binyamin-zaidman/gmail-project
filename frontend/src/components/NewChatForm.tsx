// NewChatForm.tsx
import "../styles/newChatForm.css";
import { useState } from "react";

interface NewChatFormProps { addChat: (userToChat: string) => void; onClose: () => void; }

export default function NewChatForm({ addChat, onClose }: NewChatFormProps) {
    const [userToChat, setUserToChat] = useState("");

    const handleAddChat = () => {
        addChat(userToChat);
        onClose(); // סגור את הטופס אחרי ההוספה
    };

    return (
        <div id="newChatForm">
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
