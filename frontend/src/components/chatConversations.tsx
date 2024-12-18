import Chat from "./chat";
import { useState, useEffect } from "react";
import "../styles/chatConversation.css"
import { getAllChats } from "../api/chats";
// import { getChats } from "../api/chats";
import { useParams } from "react-router-dom";

// type ShowChats = {
//     chat_id:number
//     description:string
//     id:number
//     name:string
//     timestamp:string
//     user_id:number
// }
export default function ChatConversations() {
    const [chats, setChats] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const userId = useParams().userId!;
    useEffect(() => {
        const fetchChats = async () => {
            const response = await getAllChats(userId) as any[];
            console.log({ response });
            try {

                // עיבוד השיחות כדי להוסיף את השדות החסרים
                const processedChats = response.map(chat => ({
                    id: chat.chat_id,
                    chatName: chat.name, // או כל שדה שמתאים לשם המשתמש
                    description: chat.description, // ניתן להחליף לשדה רלוונטי
                    time: new Date(chat.timestamp).toLocaleTimeString(), // פורמט הזמן
                    profileImage: "https://img.freepik.com/free-icon/user_318-159711.jpg",
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
        chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
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
                        chatId={chat.id}
                        chatName={chat.chatName}
                        message={chat.lastMessage}
                        time={chat.time}
                        profileImage={chat.profileImage}
                    />
                ))}
            </div>

        </div>
    );
}
