import Chat from "./chat";
import { useState, useEffect } from "react";
import "../styles/chatConversation.css"
import { createChat, getAllChats } from "../api/chats";
// import { getChats } from "../api/chats";
import { useParams } from "react-router-dom";
import NewChatForm from "./NewChatForm";

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
    const [showNewChatForm, setShowNewChatForm] = useState(false);
    const userId = useParams().userId!;


    useEffect(() => {
        const fetchChats = async () => {
            const response = await getAllChats(userId) as any[];
            try {

                // עיבוד השיחות כדי להוסיף את השדות החסרים
                const processedChats = response.map(chat => ({
                    id: chat.chat_id,
                    lastChat: chat.description, // ניתן להחליף לשדה רלוונטי
                    chatName: chat.name, // או כל שדה שמתאים לשם המשתמש
                    time: new Date(chat.timestamp).toLocaleTimeString(), // פורמט הזמן
                    profileImage: "https://img.freepik.com/free-icon/user_318-159711.jpg",
                    userId: chat.user_id
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


    const addChat = async (userToChat: string) => {
        const response = await createChat({ userId, userToChat });
        if (response !== null) {
            setShowNewChatForm(false);
        } else {
            alert("user is not exist");
        }
    }




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
                {/* <svg onClick={() => alert("add chat")} id="addChatButton" xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="30px" fill="blue"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" /></svg> */}
                <svg onClick={() => setShowNewChatForm(true)} id="addChatButton" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="30px" fill="blue"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" /></svg>
            </div>
            <div id="chats">
                {showNewChatForm && (<NewChatForm addChat={addChat} onClose={() => setShowNewChatForm(false)} />)}
                {filteredChats.map((chat,index) => (
                    <Chat
                        key={index}
                        chatId={chat.id}
                        chatName={chat.chatName}
                        message={chat.lastMessage}
                        time={chat.time}
                        profileImage={chat.profileImage}
                        userId={chat.userId}
                    />
                ))}
            </div>
        </div>
    );
}
