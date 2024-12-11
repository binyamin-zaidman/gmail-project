import React from "react";
import '../styles/page.css'
import { getAllChats } from "../api/chats";



function AllChats(user_id: number) {
    return getAllChats(user_id);
}
export function Page() {

    const chats = AllChats(1)
    const message = "hello world";

    return (
        <div className="ContainerPage">
            <div className="ChatBar">
                <div className="headerChatBar">
                    <h2>ChatBar</h2>
                </div>
            </div>
            <div className="chats">
                <div className="headerChats">
                    <h2>chats</h2>
                </div>
                <div className="bodyChats">
                    <h2>chat</h2>

                </div>
            </div>
            <div className="allMessage">
                <div className="headerAllMessage">
                    <h2>message</h2>
                </div>
                <div className="bodyAllMessage">
                    <h2>{message}</h2>
                    <h2>{message}</h2>
                    <h2>{message}</h2>
                    <h2>{message}</h2>
                </div>
            </div>
        </div>
    )
}
export default Page