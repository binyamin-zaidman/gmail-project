import Chat from "./chat";
import "../styles/chatConversation.css"


export default function ChatConversations() {
    return (
        <div className="chatConversationsContainer">
            <div className="headerConversations">
                <h2>Chats</h2>
                <input
                    type="text"
                    placeholder="Search"
                    name="search"
                />
                <button onClick={() => alert("Clicked")} className="addChatButton">+</button>
            </div>
            <div className="chats">
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
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
