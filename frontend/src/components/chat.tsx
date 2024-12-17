import "../styles/chat.css"

interface ChatProps {
    userName: string;
    message: string;
    time: string;
    profileImage: string;
}

export default function Chat({ userName, message, time, profileImage }: ChatProps) {

    return (
        <div id="chatContainer">
            <img src={profileImage} alt="User Profile" id="profileImage" />
            <div id="showUser">
                <p id="userName">{userName}</p>
                <p id="message">{message}</p>
            </div>
            <h4 id="time">{time}</h4>
        </div>
    );
}
