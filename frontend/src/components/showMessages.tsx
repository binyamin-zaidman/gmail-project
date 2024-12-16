import "../styles/showMessages.css"
import MessageComponent from "./message"
export default function ShowAllMessages() {

    return (
        <div className="messagesContainer">
            <div className="details">
                <img src="https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="" />
                <h3>chat details</h3>
            </div>
            <div className="allMessages">
                <MessageComponent isCurrentUser={true} userName={"beny"} content={"hello"} time={"12:30"} /> 
                <MessageComponent isCurrentUser={false} userName={"beny"} content={"hello"} time={"12:30"} /> 
                <MessageComponent isCurrentUser={true} userName={"beny"} content={"hello"} time={"12:30"} /> 
                <MessageComponent isCurrentUser={false} userName={"beny"} content={"hello"} time={"12:30"} /> 
                <MessageComponent isCurrentUser={false} userName={"beny"} content={"hello"} time={"12:30"} /> 
                <MessageComponent isCurrentUser={true} userName={"beny"} content={"hello"} time={"12:30"} /> 
                

            </div>
            <div className="sendMessage">
                <input placeholder="write a message...." type="text" name="sendMessage" />
            </div>
        </div>
    )
}