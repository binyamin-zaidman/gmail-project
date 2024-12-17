import Chat from "./chat";
import { useState, useEffect } from "react";
import "../styles/chatConversation.css"
import { getAllChats } from "../api/chats";
import { getChats } from "../api/chats";


export default function ChatConversations() {
    const [chats, setChats] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await getAllChats(1);
                console.log(response);
                
                // עיבוד השיחות כדי להוסיף את השדות החסרים
                const processedChats = response.map(chat => ({
                    id: chat.chat_id,
                    userName: chat.name, // או כל שדה שמתאים לשם המשתמש
                    lastMessage: chat.description, // ניתן להחליף לשדה רלוונטי
                    time: new Date(chat.timestamp).toLocaleTimeString(), // פורמט הזמן
                    profileImage: "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" // תמונה ברירת מחדל
                }));

                setChats(processedChats);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };

        fetchChats();
    }, []);


    // סינון שיחות לפי חיפוש
    const filteredChats = chats.filter(chat =>
        chat.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(typeof filteredChats);
    


    return (
        <div id="chatConversationsContainer">
            <div id="headerConversations">
                <h2>Chats</h2>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}


                />
                <svg onClick={() => alert("Clicked")} id="addChatButton" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="blue"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" /></svg>
            </div>
            <div id="chats">
                {filteredChats.map(chat => (
                    <Chat
                        key={chat.id}
                        userName={chat.userName}
                        message={chat.lastMessage}
                        time={chat.time}
                        profileImage={chat.profileImage}
                    />
                ))}
            </div>

        </div>
    );
}
