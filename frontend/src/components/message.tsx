import "../styles/message.css"



export default function MessageComponent({ isCurrentUser, userName, content, time }: { isCurrentUser: boolean, userName: string, content: string, time: string }) {
    
    
    return (
        <div id="messageContainer">
            <div id={`${isCurrentUser ? "currentUserMessage" : "otherUserMessage"}`}>
                <div id="myProfile">
                    <img src="../public/simpleProfile.jpg" alt="profile" />
                    <h3>{isCurrentUser ? "You" : userName}</h3>
                </div>
                <div id="messageBody">
                    <h4>{content}</h4>
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
}
