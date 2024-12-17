import Chat from "./chat";
import "../styles/chatConversation.css"



export default function ChatConversations() {
    return (
        <div id ="chatConversationsContainer">
            <div id ="headerConversations">
                <h2>Chats</h2>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                />
                <svg onClick={() => alert("Clicked")} id ="addChatButton" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="blue"><path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z"/></svg>
            </div>
            <div id ="chats">
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />

            </div>
        </div>
    );
}
