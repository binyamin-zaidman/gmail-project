import "../styles/message.css"
export default function MessageComponent({ isCurrentUser, userName, content, time }: { isCurrentUser: boolean, userName: string, content: string, time: string }) {
    return (
        <div className="messageContainer">
            <div className={`${isCurrentUser ? "currentUserMessage" : "otherUserMessage"}`}>
                <div className="messageBody">
                    <h2>{isCurrentUser ? "You" : userName}</h2>
                    <h3>{content}</h3>
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
}
