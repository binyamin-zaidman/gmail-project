import "../styles/chat.css"


export default function Chat() {
    
    return (
        <div id ="chatContainer">
            <img
                src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg"
                alt="User Profile"
                id ="profileImage"
            />
            <div id ="showUser">
                <p id ="userName">User Name</p>
                <p id ="message">This is a short message preview...</p>
            </div>
            <h4 id ="time">12:30 PM</h4>
        </div>
    );
}
