
// NewChatForm.tsx
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
                placeholder="User to chat"
                value={userToChat}
                onChange={(e) => setUserToChat(e.target.value)}
            />
            <button onClick={handleAddChat}>Add Chat</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
