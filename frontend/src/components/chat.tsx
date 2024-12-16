import "../styles/chat.css"


export default function Chat() {
    
    return (
        <div className="chatContainer">
            <img
                src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                alt="User Profile"
                className="profileImage"
            />
            <div className="showUser">
                <h2 className="userName">User Name</h2>
                <h3 className="message">This is a short message preview...</h3>
            </div>
            <h4 className="time">12:30 PM</h4>
        </div>
    );
}
