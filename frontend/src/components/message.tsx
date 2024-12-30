import "../styles/message.css"



export default function MessageComponent({ isCurrentUser, userName, content, time }: { isCurrentUser: boolean, userName: string, content: string, time: string }) {
    
// console.log({isCurrentUser, userName, content, time});
    
    return (
        <div id="messageContainer">
            <div className="message" id={`${isCurrentUser ? "currentUserMessage" : "otherUserMessage"}`}>
                <div id="myProfile">
                    <img src="/public/simpleProfile.jpg" alt="profile" />
                    <h3>{isCurrentUser ? "You" : userName}</h3>
                </div>
                <div id="messageBody">
                    <h4 className="content">{content}</h4>
                    <p className="time">{time}</p>
                </div>
            </div>
        </div>
    );
}
